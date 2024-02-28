from fastapi import FastAPI, Response, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from getShrooms import getShrooms
import addFind
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

class MushroomRecord(BaseModel):
    mushroom: str
    latitude: float
    longitude: float
    environment: str

@app.post("/shrooms/")
async def create_mushroom_record(record: MushroomRecord, db: Session = Depends(addFind.get_db)):
    return addFind.add_mushroom_record(db, record)



@app.get("/stocklist/{name}")
def getStocks(name: str):
    sym = getSymbols(name)
    updateStock(sym)
    stocklist = getStocklist(sym)
    content = {'data': stock for stock in stocklist}
    return content

uvicorn.run(app,host="0.0.0.0",port="8080")