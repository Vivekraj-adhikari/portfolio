from training_pipeline.diabetes_training import DiabetesTrainingPipeline
from prediction_pipeline.diabetes_prediction import DiabetesPredictionPipeline

training_pipeline = DiabetesTrainingPipeline()
prediction_pipeline = DiabetesPredictionPipeline()

training_pipeline.train_model()

input_features = [
    [101,76,48,180,32.9,0.171],
    [122,70,27,0,36.8,0.34],
    [121,72,23,112,26.2,0.245],
    [126,60,0,0,30.1,0.349],
    [123,72,0,0,36.3,0.258],
    [190,92,0,0,35.5,0.278]
]

pred = prediction_pipeline.predict_diabetes(input_features)

print(pred)