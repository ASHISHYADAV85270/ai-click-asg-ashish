import os
import time
import logging
import aiosqlite
from dotenv import load_dotenv
from fastapi import FastAPI , HTTPException
from fastapi.middleware.cors import CORSMiddleware
from seed_db import seed

from models import (
    MentionFilters,
    MentionsRequest,
    MentionsResponse,
    Mention,
    StatsResponse,
    TrendsRequest,
    TrendsResponse,
    TrendPoint,
)

load_dotenv()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Brand Mentions API")

@app.middleware("http")
async def log_request_time(request, call_next):
    start = time.time()

    response = await call_next(request)

    duration = round((time.time() - start) * 1000,2)

    logger.info(f"{request.method} {request.url.path} - {duration}ms")

    return response


ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:3000"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_PATH = os.path.join(os.path.dirname(__file__), "mentions.db")


# Initialize seed data only for first-time setup.
# Previously the database was reseeded on every restart, which increased startup time.
# We now seed only when the SQLite database file is missing, making startup idempotent
# while preserving existing data between application restarts.
@app.on_event("startup")
async def startup():
    try:
        if not os.path.exists(DB_PATH):
            seed()
            logger.info("Database seeded successfully")
        else:
            logger.info("Database already exists. Skipping seed.")
    except Exception as e:
        logger.error(f"Seed failed: {e}")



@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/mentions", response_model=MentionsResponse)
async def get_mentions(request: MentionsRequest):
    page = request.page
    per_page = request.per_page
    offset = (page - 1) * per_page

    query = """
        SELECT *
        FROM mentions
        WHERE 1=1
    """

    count_query = """
        SELECT COUNT(*)
        FROM mentions
        WHERE 1=1
    """

    params = []

    if request.filters:
        if request.filters and request.filters.query:
            search_value = f"%{request.filters.query}%"

            query += " AND query_text LIKE ?"
            count_query += " AND query_text LIKE ?"

            params.append(search_value)

        if request.filters.model:
            query += " AND model = ?"
            count_query += " AND model = ?"
            params.append(request.filters.model)

        if request.filters.sentiment:
            query += " AND sentiment = ?"
            count_query += " AND sentiment = ?"
            params.append(request.filters.sentiment)

        if request.filters.date_from:
            query += " AND date(created_at) >= date(?)"
            count_query += " AND date(created_at) >= date(?)"
            params.append(request.filters.date_from)

        if request.filters.date_to:
            query += " AND date(created_at) <= date(?)"
            count_query += " AND date(created_at) <= date(?)"
            params.append(request.filters.date_to)

    query += """
        ORDER BY created_at DESC
        LIMIT ?
        OFFSET ?
    """

    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row

        count_cursor = await db.execute(count_query, params)
        total = (await count_cursor.fetchone())[0]

        data_cursor = await db.execute(
            query,
            params + [per_page, offset]
        )

        rows = await data_cursor.fetchall()

    mentions = [
        Mention(
            id=row["id"],
            query_text=row["query_text"],
            model=row["model"],
            mentioned=bool(row["mentioned"]),
            position=row["position"],
            sentiment=row["sentiment"],
            citation_url=row["citation_url"],
            created_at=row["created_at"],
        )
        for row in rows
    ]

    return MentionsResponse(
        data=mentions,
        total=total,
        page=page,
        per_page=per_page,
    )


# For Debugging If the DB has been initiated On render or not 
@app.get("/debug")
async def debug():
    async with aiosqlite.connect(DB_PATH) as db:
        cursor = await db.execute(
            "SELECT name FROM sqlite_master WHERE type='table'"
        )
        tables = await cursor.fetchall()

    return {
        "db_path": DB_PATH,
        "tables": tables
    }


@app.post("/mentions/trends", response_model=TrendsResponse)
async def get_trends(request: TrendsRequest):

    if request.group_by == "week":
        date_expr = "strftime('%Y-%W', created_at)"
    else:
        date_expr = "date(created_at)"

    query = f"""
        SELECT
            {date_expr} as period,
            COUNT(*) as total,
            SUM(CASE WHEN mentioned = 1 THEN 1 ELSE 0 END) as mentioned
        FROM mentions
        WHERE 1=1
    """

    params = []

    if request.date_from:
        query += " AND date(created_at) >= date(?)"
        params.append(request.date_from)

    if request.date_to:
        query += " AND date(created_at) <= date(?)"
        params.append(request.date_to)

    if request.query:
        query += " AND query_text LIKE ?"
        params.append(f"%{request.query}%")

    if request.model:
        query += " AND model = ?"
        params.append(request.model)

    if request.sentiment:
        query += " AND sentiment = ?"
        params.append(request.sentiment)

    query += f"""
        GROUP BY {date_expr}
        ORDER BY {date_expr}
    """

    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row

        cursor = await db.execute(query, params)
        rows = await cursor.fetchall()

    return TrendsResponse(
        data=[
            TrendPoint(
                date=row["period"],
                total=row["total"],
                mentioned=row["mentioned"] or 0,
            )
            for row in rows
        ]
    )


@app.post("/mentions/stats", response_model=StatsResponse)
async def get_stats(filters: MentionFilters | None = None):
    query = """
    SELECT
        COUNT(*) as total_mentions,
        SUM(CASE WHEN mentioned = 1 THEN 1 ELSE 0 END) as mentioned_count,
        SUM(CASE WHEN sentiment = 'positive' THEN 1 ELSE 0 END) as positive_count,
        AVG(position) as avg_position
    FROM mentions
    WHERE 1=1
    """

    params = []

    if filters:
        if filters.query:
            query += " AND query_text LIKE ?"
            params.append(f"%{filters.query}%")

        if filters.model:
            query += " AND model = ?"
            params.append(filters.model)

        if filters.sentiment:
            query += " AND sentiment = ?"
            params.append(filters.sentiment)

        if filters.date_from:
            query += " AND date(created_at) >= date(?)"
            params.append(filters.date_from)

        if filters.date_to:
            query += " AND date(created_at) <= date(?)"
            params.append(filters.date_to)

    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row

        cursor = await db.execute(query, params)
        row = await cursor.fetchone()

    return StatsResponse(
        total_mentions=row["total_mentions"] or 0,
        mentioned_count=row["mentioned_count"] or 0,
        positive_count=row["positive_count"] or 0,
        avg_position=round(row["avg_position"] or 0, 2),
    )