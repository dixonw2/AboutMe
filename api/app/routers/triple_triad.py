from fastapi import APIRouter, Depends, Query
from typing import List
from sqlalchemy.orm import Session
from sqlalchemy import select
from database import get_db

from schemas.triple_triad_card import TripleTriadCardSchema
from models.triple_triad_cards import TripleTriadsCards

router = APIRouter(prefix="/triple-triad", tags=["triple-triad"])


@router.get(
    "/cards",
    response_model=List[TripleTriadCardSchema],
    description="Get Triple Triad cards",
)
async def get_triple_triad_cards(
    db: Session = Depends(get_db),
    level: int = Query(
        None,
        ge=1,
        le=10,
        description="Get cards of a specific level",
        example=4,
    ),
):
    query = select(TripleTriadsCards)
    if level is not None:
        query = query.where(TripleTriadsCards.level == level)
    return db.execute(query).scalars().all()
