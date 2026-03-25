from fastapi import FastAPI
from routes.diabetes_prediction_route import router as diabetes_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Prediction API",
    description="API ML models",
    version="1.0"
)
origins = [
    "https://portfolio-175t.onrender.com",   # React default
    "http://127.0.0.1:5173",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(diabetes_router)

@app.get('/')
def home():
    return {"message": "Welcome to the Prediction API!"}