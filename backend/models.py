from pydantic import BaseModel
from typing import Optional
from datetime import datetime


# Request models

class MentionFilters(BaseModel):
    query: Optional[str] = None
    model: Optional[str] = None
    sentiment: Optional[str] = None
    date_from: Optional[str] = None
    date_to: Optional[str] = None


class MentionsRequest(BaseModel):
    page: int = 1
    per_page: int = 25
    filters: Optional[MentionFilters] = None


class TrendsRequest(BaseModel):
    date_from: Optional[str] = None
    date_to: Optional[str] = None
    group_by: str = "day"  # "day" or "week"


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
