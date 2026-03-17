from fastapi import FastAPI
from routes.diabetes_prediction_route import router as diabetes_router

app = FastAPI(
    title="Prediction API",
    description="API ML models",
    version="1.0"
)

app.include_router(diabetes_router)

@app.get('/')
def home():
    return {"message": "Welcome to the Prediction API!"}