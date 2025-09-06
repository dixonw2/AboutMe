from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated, List, Optional
from pydantic import BaseModel
from sqlalchemy import text
from database import SessionLocal, engine, Base, get_db
import models
from sqlalchemy.orm import Session
import schemas
import routers

app = FastAPI()

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(routers.songs_router, prefix="/api")
app.include_router(routers.comments_router, prefix="/api")
app.include_router(routers.triple_triad_router, prefix="/api")
