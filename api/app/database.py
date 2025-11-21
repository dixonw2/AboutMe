from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

DEFAULT_DATABASE_URL = (
    "mssql+pyodbc://@localhost\\AboutMe/AboutMe"
    "?driver=ODBC+Driver+18+for+SQL+Server"
    "&trusted_connection=yes"
    "&TrustServerCertificate=yes"
)

TESTING_DATABASE_URL = (
    "mssql+pyodbc://@localhost\\AboutMe/AboutMe_Testing"
    "?driver=ODBC+Driver+18+for+SQL+Server"
    "&trusted_connection=yes"
    "&TrustServerCertificate=yes"
)

DATABASE_URL = os.getenv("DATABASE_URL", DEFAULT_DATABASE_URL)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
