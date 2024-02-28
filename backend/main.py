from fastapi import FastAPI, Response, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from get_shrooms import get_shrooms
from get_finds import get_finds
import add_find
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Schluessel": "Wert"}

# get List of all mushrooms in database
@app.get("/shrooms/")
def getShrooms():
    results = get_shrooms()
    return results

# get all mushrooms already found
@app.get("/shrooms/finds")
def getFinds():
    results = get_finds()
    return results

class MushroomRecord(BaseModel):
    mushroom: str
    latitude: float
    longitude: float
    environment: str

@app.post("/shrooms/")
async def create_mushroom_record(record: MushroomRecord, db: Session = Depends(add_find.get_db)):
    return add_find.add_mushroom_record(db, record)

#Can be tested using the following command
#curl -X POST http://localhost:8080/shrooms/ \
#     -H "Content-Type: application/json" \
#     -d '{"mushroom": "Amanita muscaria", "latitude": 51.5074, "longitude": -0.1278, "environment": "Wiese"}'

uvicorn.run(app,host="0.0.0.0",port="8080")