from pydantic import BaseModel,Field
from typing import Optional
from datetime import datetime
from typing import Literal


# Request models

class MentionFilters(BaseModel):
    query: Optional[str] = None
    model: Optional[str] = None
    sentiment: Optional[str] = None
    date_from: Optional[str] = None
    date_to: Optional[str] = None


class MentionsRequest(BaseModel):
    page: int = Field(default=1,ge=1)

    per_page: int = Field(default=10,ge=1,le=100)

    filters: MentionFilters | None = None


class TrendsRequest(BaseModel):
    date_from: Optional[str] = None
    date_to: Optional[str] = None
    group_by: Literal["day", "week"] = "day"


# Response models

class Mention(BaseModel):
    id: str
    query_text: str
    model: str
    mentioned: bool
    position: Optional[int] = None
    sentiment: Optional[str] = None
    citation_url: Optional[str] = None
    created_at: datetime


class MentionsResponse(BaseModel):
    data: list[Mention]
    total: int
    page: int
    per_page: int


class TrendPoint(BaseModel):
    date: str
    total: int
    mentioned: int


class TrendsResponse(BaseModel):
    data: list[TrendPoint]
