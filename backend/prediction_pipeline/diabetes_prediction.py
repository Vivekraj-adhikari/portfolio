import joblib

class DiabetesPredictionPipeline:
    def __init__(self):
        self.diabetes_model = joblib.load('artifacts/diabetes_model.pkl')

    def predict_diabetes(self, input_features):
        prediction = self.diabetes_model.predict(input_features)
        return prediction