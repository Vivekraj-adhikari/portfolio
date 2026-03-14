import joblib
from data_pipeline.diabetes import DiabetesDataPipeline
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score, confusion_matrix
class DiabetesTrainingPipeline:
    def __init__(self, csv_path='data/diabetes.csv'):
        self.data_pipeline = DiabetesDataPipeline(csv_path)
        self.model_pipeline = Pipeline([
            ('scaler', StandardScaler()),
            ('classifier', LogisticRegression())
        ])

    def train_model(self):
        df = self.data_pipeline.data_ingestion()
        X, y = self.data_pipeline.data_preprocessing(df)
        X_train, X_test, y_train, y_test = self.data_pipeline.split_data(X, y)
        self.model_pipeline.fit(X_train, y_train)
        pred = self.model_pipeline.predict(X_test)
        print("Accuracy:", accuracy_score(y_test, pred))
        print("Confusion Matrix:\n", confusion_matrix(y_test, pred))
        joblib.dump(self.model_pipeline, 'artifacts/diabetes_model.pkl')
        

