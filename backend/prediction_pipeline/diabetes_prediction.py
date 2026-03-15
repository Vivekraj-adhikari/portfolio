import joblib

class DiabetesPredictionPipeline:
    def __init__(self):
        self.diabetes_model = joblib.load('artifacts/diabetes_model.pkl')

    def predict_diabetes(self, input_features):
        prediction = []
        for features in input_features:
            pred = self.diabetes_model.predict([features])
            prediction.append(pred)
        return prediction