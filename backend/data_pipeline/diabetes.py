import pandas as pd
import numpy as np
def data_ingestion(csv_path):
    df = pd.read_csv(csv_path)
    return df

def data_preprocessing(df):
    columns = ['Glucose', 'BloodPressure', 'SkinThickness', 'Insulin', 'BMI']
    df[columns] = df[columns].replace(0, np.nan)
    df[columns] = df[columns].fillna(df[columns].median())

    columns_to_select = ["Glucose", "BloodPressure", "SkinThickness", "Insulin", "BMI", 'DiabetesPedigreeFunction', 'Outcome']
    cleaned_df = df.loc[:, columns_to_select]
    return cleaned_df