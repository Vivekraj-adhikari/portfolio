import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
class DiabetesDataPipeline:
    def __init__(self, csv_path):
        self.csv_path = csv_path

    def data_ingestion(self):
        df = pd.read_csv(self.csv_path)
        return df

    def data_preprocessing(self, df):
        columns = ['Glucose', 'BloodPressure', 'SkinThickness', 'Insulin', 'BMI']
        df[columns] = df[columns].replace(0, np.nan)
        df[columns] = df[columns].fillna(df[columns].median())

        columns_to_select = ["Glucose", "BloodPressure", "SkinThickness", "Insulin", "BMI", 'DiabetesPedigreeFunction', 'Outcome']
        cleaned_df = df.loc[:, columns_to_select]

        X = cleaned_df.drop('Outcome', axis=1)
        y = cleaned_df['Outcome']
        return X, y
    
    def split_data(self, X, y):
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
        return X_train, X_test, y_train, y_test