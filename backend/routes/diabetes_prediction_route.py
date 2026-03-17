from fastapi import APIRouter
from prediction_pipeline.diabetes_prediction import DiabetesPredictionPipeline

router = APIRouter(prefix="/predict_diabetes", tags=['Prediction'])

@router.post('/')
def predict_diabetes(input_features: list):
    prediction_pipeline = DiabetesPredictionPipeline()
    prediction = prediction_pipeline.predict_diabetes(input_features)
    return prediction