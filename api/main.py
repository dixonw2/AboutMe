import datetime
from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated
from sqlalchemy import text
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import SessionLocal, engine
import models
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
	'http://localhost:3000'
]

app.add_middleware(
	CORSMiddleware,
	allow_origins=origins
)

class SongsBase(BaseModel):
	song_name: str
	artist: str
	album: str
	genre: str
	song_length: datetime.time
	apple_music_link: str
	spotify_link: str
	year: int

class SongsModel(SongsBase):
	id: int

	class Config:
		from_attributes = True

def get_db():
	db = SessionLocal()
	try:
		yield db
	finally:
		db.close()

db_dependency = Annotated[Session, Depends(get_db)]
models.Base.metadata.create_all(bind=engine)

@app.get("/songs")
async def get_songs(db: db_dependency):
	return db.query(models.Songs).all()

@app.get("/")
async def get():
	return "Landing page!"