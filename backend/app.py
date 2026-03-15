from training_pipeline.diabetes_training import DiabetesTrainingPipeline
from prediction_pipeline.diabetes_prediction import DiabetesPredictionPipeline

training_pipeline = DiabetesTrainingPipeline()
prediction_pipeline = DiabetesPredictionPipeline()

training_pipeline.train_model()

input_features = [
    [131,0,0,0,43.2,0.27]
    # [109,92,0,0,42.7,0.845]
]

pred = prediction_pipeline.predict_diabetes(input_features)

print(pred)