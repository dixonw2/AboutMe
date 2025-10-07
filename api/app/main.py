from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
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
app.include_router(routers.events_router, prefix="/api")