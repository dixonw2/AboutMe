from fastapi import APIRouter, Depends, Query
from typing import List
from sqlalchemy.orm import Session
from sqlalchemy import select
from database import get_db

from schemas.years_comment import YearsCommentSchema
from models.years_comments import YearsComments

from datetime import datetime

router = APIRouter(prefix="/comments", tags=["comments"])


@router.get(
    "/", response_model=List[YearsCommentSchema], description="Get comments for years"
)
async def get_comments(
    db: Session = Depends(get_db),
    year: int = Query(
        None,
        ge=2017,
        le=datetime.now().year - 1,  # comments only available for past years since 2017
        description="Get comments for a specific year",
    ),
):
    query = select(YearsComments)
    if year is not None:
        query = query.where(YearsComments.year == year)
    return db.scalars(query).all()
