from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
import app.routers as routers

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

app.include_router(routers.favorite_songs_router, prefix="/api")
app.include_router(routers.triple_triad_router, prefix="/api")
app.include_router(routers.events_router, prefix="/api")
app.include_router(routers.blog_router, prefix="/api")
