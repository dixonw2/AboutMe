import colorama
colorama.init()

import datetime
import random
from fastapi import FastAPI, APIRouter, HTTPException, Depends
from typing import Annotated, List, Optional
from sqlalchemy import select
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import SessionLocal, engine
import models
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
router = APIRouter()
origins = [
	'http://localhost:3000'
]

app.add_middleware(
	CORSMiddleware,
	allow_origins=origins,
	allow_credentials = True,
	allow_methods = ['*'],
	allow_headers = ['*']
)

#region Base Models
class SongsBase(BaseModel):
	song_name: str = None
	artist: str = None
	album: str = None
	genre: str = None
	song_length: datetime.time = None
	apple_music_link: str = None
	spotify_link: str = None
	year: int = None


class YearsCommentsBase(BaseModel):
	year: int = None
	comment: str = None


class TripleTriadCardsBase(BaseModel):
	card_name: str = None
	left: int = None
	up: int = None
	right: int = None
	down: int = None
	element: Optional[str] = None
	level: int = None
#endregion

def get_db():
	db = SessionLocal()
	try:
		yield db
	finally:
		db.close()


db_dependency = Annotated[Session, Depends(get_db)]
models.Base.metadata.create_all(bind=engine)

#region Endpoints
#region Music
@router.get("/music/favorite-songs", response_model=List[SongsBase], description="Get favorite songs from a list I've made every year since 2017.")
async def get_songs(db: db_dependency, year: Optional[int] = None):
	song_list = select(models.Songs)
	if year is not None:
		song_list = song_list.where(models.Songs.year == year)
	return db.scalars(song_list)


@router.get("/music/favorite-songs/years", response_model=List[int], description="Get a list of the years that have a Favorite Songs list.")
async def get_years(db: db_dependency):
	return list(db.scalars(select(models.YearsComments.year)))


@router.get("/music/favorite-songs/comments", response_model=List[YearsCommentsBase], description="Get the comment for each year")
async def get_comments(db: db_dependency, year: Optional[int] = None):
	comment_list = select(models.YearsComments)
	if year is not None:
		comment_list = comment_list.where(models.YearsComments.year == year)
	return db.scalars(comment_list)


#endregion
#region Triple Triad
@router.get("/triple-triad/cards/all", response_model=List[TripleTriadCardsBase], description="Get Triple Triad card data")
async def get_triple_triad_cards(db: db_dependency, level: Optional[int] = None, element: Optional[str] = None):
	card_list = select(models.TripleTriadCards)
	if level is not None:
		card_list = card_list.where(models.TripleTriadCards.level == level)
	if element is not None:
		card_list = card_list.where(models.TripleTriadCards.element == element)
	return db.scalars(card_list.order_by(models.TripleTriadCards.level, models.TripleTriadCards.card_name))


@router.get("/triple-triad/cards/random", response_model=List[TripleTriadCardsBase], description="Get a random list of cards")
async def get_random_cards(db: db_dependency, count: Optional[int] = 20, weighted: Optional[bool] = False):
	cards = db.scalars(select(models.TripleTriadCards)).all()

	def get_weight(card):
		level = card.level
		if level in [3, 4]:
			return 10  # Most common
		elif level in [1, 2]:
			return 4   # Uncommon
		elif level in [5, 6]:
			return 2.5   # Rare
		elif level in [7, 8]:
			return 1   # Very rare
		elif level in [9, 10]:
			return 0.5 # Extremely rare
		else:
			raise HTTPException(status_code=400, detail=f"Card {card.card_name} has an invalid level: {level}")

	selected_cards = []

	if weighted:
		population = cards[:]
		weights = [get_weight(card) for card in population]

		for _ in range(min(count, len(population))):
			chosen = random.choices(population, weights=weights, k=1)[0]
			idx = population.index(chosen)
			selected_cards.append(chosen)
			del population[idx]
			del weights[idx]
	else:
		selected_cards = random.sample(cards, k=count)

	return sorted(selected_cards, key=lambda card: (card.level, card.card_name))


#endregion
#endregion

app.include_router(router, prefix="/api")