from fastapi import FastAPI
from pymongo import MongoClient
from dotenv import dotenv_values
from os.path import join, dirname
from app.api.router import router as user_router
from starlette.middleware.cors import CORSMiddleware

config = dotenv_values(dotenv_path = join(dirname(__file__), ".env"))
app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ['*'],
    allow_headers = ["*"]
)

@app.on_event("startup")
def startup_db_client():
    app.mongodb_client = MongoClient(config["ATLAS_URI"])
    app.database = app.mongodb_client[config["DB_NAME"]]
    print("Connected to the MongoDB database")
    
@app.on_event("shutdown")
def shutdown_mongodb_client():
    app.mongodb_client.close()
    print("Shutdown to connection")
    
app.include_router(user_router, tags=["Users"])
    