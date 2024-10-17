import os
import json
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# Normalize path so that it isn't OS specific
config_path = os.path.normpath(os.path.join(f'{os.path.dirname(__file__)}/config', 'config.json'))
with open(config_path) as config_file:
	config = json.load(config_file)
	DB_USER = config['dbUser']
	DB_PASSWORD = config['dbPassword']
	DB_SERVER = config['dbServer']
	DB_NAME = config['dbName']

SQLALCHEMY_DATABASE_URI = (f'mssql+pyodbc://{DB_USER}:{DB_PASSWORD}@{DB_SERVER}:1433/{DB_NAME}?driver=ODBC+Driver+18+for+SQL+Server&Encrypt=yes&TrustServerCertificate=no&ConnectionTimeout=120')

engine = create_engine(SQLALCHEMY_DATABASE_URI, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
