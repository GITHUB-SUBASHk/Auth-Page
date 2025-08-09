# app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import os
import database
import auth
import products

# FastAPI app instance
app = FastAPI()

# CORS: Allow your React frontend to talk to backend
origins = [
    os.getenv("FRONTEND_URL", "http://localhost:3000"),
]
# CORS middleware setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include auth routes from auth.py and products (to be created next)
app.include_router(auth.router)
app.include_router(products.router)

# This is just a simple health check endpoint
@app.get("/")
def read_root():
    return {"message": "Backend is running!"}
    
# Create DB tables on startup
@app.on_event("startup")
def startup():
    database.Base.metadata.create_all(bind=database.engine)
