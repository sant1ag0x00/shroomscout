from sqlalchemy import create_engine, Column, Integer, String, Float, Table, MetaData
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import SQLAlchemyError
from fastapi import HTTPException

# Database setup
DATABASE_URL = "sqlite:///../database/shroomscout"
engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

metadata = MetaData()
mushroom_table = Table(
    "findLog", metadata,
    Column('id', Integer, primary_key=True),
    Column('mushroom', String),
    Column('latitude', Float),
    Column('longitude', Float),
    Column('environment', String)
)

metadata.create_all(engine)  # Ensure tables are created

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def add_mushroom_record(db, record):
    new_record = mushroom_table.insert().values(
        mushroom=record.mushroom,
        latitude=record.latitude,
        longitude=record.longitude,
        environment=record.environment
    )
    try:
        db.execute(new_record)
        db.commit()
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))