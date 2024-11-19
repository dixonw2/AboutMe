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

@router.get("/songs", response_model=List[SongsBase], description="Returns all songs")
async def get_all_songs(db: db_dependency):
	return db.query(models.Songs).all()


@router.get("/comments", response_model=List[YearsCommentsBase], description="Returns all years' comments")
async def get_all_comments(db: db_dependency):
	return db.query(models.YearsComments).all()


app.include_router(router, prefix="/api")