import colorama
colorama.init()

import datetime
from fastapi import FastAPI, APIRouter, HTTPException, Depends
from typing import Annotated, List, Optional
from sqlalchemy import text
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import SessionLocal, engine
import models
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


def get_db():
	db = SessionLocal()
	try:
		yield db
	finally:
		db.close()

db_dependency = Annotated[Session, Depends(get_db)]
models.Base.metadata.create_all(bind=engine)

@router.get("/songs", response_model=List[SongsBase], description="Returns favorite songs from a list I've made every year since 2017.")
async def get_songs(db: db_dependency, year: Optional[int] = None):
	songs_list = db.query(models.Songs)
	if year is not None:
		songs_list = songs_list.filter(models.Songs.year == year)
	return songs_list.all()


@router.get("/comments", response_model=List[YearsCommentsBase], description="Returns the comment for each year")
async def get_all_comments(db: db_dependency, year: Optional[int] = None):
	comments_list = db.query(models.YearsComments)
	if year is not None:
		comments_list = comments_list.filter(models.YearsComments.year == year)
	return comments_list.all()


app.include_router(router, prefix="/api")