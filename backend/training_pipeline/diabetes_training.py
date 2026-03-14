from data_pipeline.diabetes import DiabetesDataPipeline
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
class DiabetesTrainingPipeline:
    def __init__(self):
        self.data_pipeline = DiabetesDataPipeline(csv_path='../data/diabetes.csv')
        self.model_pipeline = Pipeline([
            ('scaler', StandardScaler()),
            ('classifier', LogisticRegression())
        ])
