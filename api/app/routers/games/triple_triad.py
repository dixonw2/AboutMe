from fastapi import APIRouter, Depends, Query, HTTPException
import random
from typing import List
from sqlalchemy.orm import Session
from sqlalchemy import func, select
from database import get_db

from schemas.games.triple_triad_card import TripleTriadCardRead
from models.games.triple_triad_card import TripleTriadCard

router = APIRouter(prefix="/triple-triad", tags=["triple-triad"])


# region Endpoints
@router.get(
    "/cards",
    response_model=List[TripleTriadCardRead],
    description="Get Triple Triad cards",
)
async def get_triple_triad_cards(
    db: Session = Depends(get_db),
    level: int = Query(
        None,
        ge=1,
        le=10,
        description="Get cards of a specific level",
    ),
    element: str = Query(None, description="Get cards of a specific element"),
):
    query = select(TripleTriadCard)
    if level is not None:
        query = query.where(TripleTriadCard.level == level)
    if element is not None:
        if element == "none":
            query = query.where(TripleTriadCard.element.is_(None))
        else:
            query = query.where(TripleTriadCard.element == element)
    return db.execute(query).scalars().all()


@router.get(
    "/cards/random",
    response_model=List[TripleTriadCardRead],
    description="Get a random list of Triple Triad cards",
)
async def get_random_cards(
    db: Session = Depends(get_db),
    count: int = Query(
        20, ge=1, le=110, description="Number of random cards to retrieve"
    ),
    weighted: bool = Query(
        True, description="Whether to weigh the random selection by card rarity"
    ),
):
    cards = db.scalars(select(TripleTriadCard)).all()

    random_cards = get_random_cards(cards, count, weighted)
    random_cards.sort(key=lambda card: (card.level, card.card_name))
    return random_cards


@router.get(
    "/cards/random/hand",
    response_model=List[TripleTriadCardRead],
    description="Get a random hand of 5 Triple Triad cards",
)
async def get_triple_triad_hand(
    db: Session = Depends(get_db),
    sample: int = Query(
        20, ge=5, le=110, description="Number of random cards to sample from"
    ),
    weighted: bool = Query(
        True, description="Whether to weigh the random selection by card rarity"
    ),
):
    cards = db.scalars(select(TripleTriadCard)).all()

    hand = get_random_cards(cards, sample, weighted)
    hand.sort(key=lambda card: (card.level, card.card_name))
    return hand[-5:]


# endregion
# region Helper Functions
def get_random_cards(
    cards: List[TripleTriadCard], count: int, weighted: bool
) -> List[TripleTriadCard]:

    if count > len(cards):
        count = len(cards)

    # Weighted selection helper
    def get_weight(card: TripleTriadCard) -> float:
        level = card.level
        if level in [1, 2]:
            return 4
        elif level in [3, 4]:
            return 6
        elif level in [5, 6]:
            return 7
        elif level in [7, 8]:
            return 2
        elif level in [9, 10]:
            return 1
        else:
            raise HTTPException(
                status_code=400,
                detail=f"Card {card.card_name} has an invalid level: {level}",
            )

    if weighted:
        population = cards[:]
        weights = [get_weight(card) for card in population]
        selected_cards = []

        for _ in range(count):
            chosen = random.choices(population, weights=weights, k=1)[0]
            selected_cards.append(chosen)
            idx = population.index(chosen)
            del population[idx]
            del weights[idx]
    else:
        selected_cards = random.sample(cards, k=count)

    selected_cards.sort(key=lambda card: (card.level, card.card_name))
    return selected_cards


# endregion


# Should all logic be in here for even the "wave" kind of thing I just thought of where you start with bad cards and get better ones as you win?
# Can steal ante cards so you start with a tier 8 or something and so does the opponent (or maybe a level lower?)
# Tbh just adding this to remind myself of this idea
