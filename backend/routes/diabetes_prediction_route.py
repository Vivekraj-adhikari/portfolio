from pyexpat import features

from fastapi import APIRouter
import json
from prediction_pipeline.diabetes_prediction import DiabetesPredictionPipeline
from pydantic import BaseModel
router = APIRouter(prefix="/predict_diabetes", tags=['Prediction'])


class DiabetesFeatures(BaseModel):
    glucose: float
    blood_pressure: float
    skin_thickness: float
    insulin: float
    bmi: float
    diabetes_pedigree_function: float

@router.post('/')
def predict_diabetes(input_features: DiabetesFeatures):
    features_list = [
        input_features.glucose,
        input_features.blood_pressure,
        input_features.skin_thickness,
        input_features.insulin,
        input_features.bmi,
        input_features.diabetes_pedigree_function
    ]
    prediction_pipeline = DiabetesPredictionPipeline()
    prediction = prediction_pipeline.predict_diabetes(features_list)
    return {"prediction": "Diabetic" if prediction == 1 else "Non-Diabetic"}