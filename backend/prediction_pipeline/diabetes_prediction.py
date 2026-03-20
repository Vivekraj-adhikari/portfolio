import joblib
import numpy as np
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
        input_array = np.array(input_features).reshape(1, -1)
        data = pd.DataFrame(input_array, columns=columns)
        prediction = self.diabetes_model.predict(data)
        return int(prediction[0])