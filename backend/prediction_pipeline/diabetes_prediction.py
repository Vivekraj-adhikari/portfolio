import joblib
import pandas as pd

class DiabetesPredictionPipeline:
    def __init__(self):
        self.diabetes_model = joblib.load('artifacts/diabetes_model.pkl')

    def predict_diabetes(self, input_features):
        columns = [
            'Glucose',
            'BloodPressure',
            'SkinThickness',
            'Insulin',
            'BMI',
            'DiabetesPedigreeFunction',
        ]
        data = pd.DataFrame(input_features, columns=columns)
        prediction = self.diabetes_model.predict(data)
        return prediction