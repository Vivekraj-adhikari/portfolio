from pyexpat import features

from fastapi import APIRouter
import json
from prediction_pipeline.diabetes_prediction import DiabetesPredictionPipeline
from pydantic import BaseModel
router = APIRouter(prefix="/predict_diabetes", tags=['Prediction'])


class DiabetesFeatures(BaseModel):
    Glucose: float
    BloodPressure: float
    SkinThickness: float
    Insulin: float
    BMI: float
    DiabetesPedigreeFunction: float

@router.post('/')
def predict_diabetes(input_features: DiabetesFeatures):
    features_list = [
        input_features.Glucose,
        input_features.BloodPressure,
        input_features.SkinThickness,
        input_features.Insulin,
        input_features.BMI,
        input_features.DiabetesPedigreeFunction
    ]
    prediction_pipeline = DiabetesPredictionPipeline()
    prediction = prediction_pipeline.predict_diabetes(features_list)
    return prediction