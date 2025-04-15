# Import necessary libraries
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import r2_score
from scipy.stats import chi2_contingency
from statsmodels.stats.outliers_influence import variance_inflation_factor
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import joblib  # for saving the model
import warnings
import os
import time

warnings.filterwarnings('ignore')

# Load the dataset
a1 = pd.read_excel(r"C:\Users\krish\OneDrive\Desktop\PBL\Internal_Bank_Dataset.xlsx")
a2 = pd.read_excel(r"C:\Users\krish\OneDrive\Desktop\PBL\External_Cibil_Dataset.xlsx")

df1 = a1.copy()
df2 = a2.copy()

# Merge the two dataframes using an inner join so that no nulls are present
df = pd.merge(df1, df2, how='inner', left_on=['PROSPECTID'], right_on=['PROSPECTID'])

# Remove rows containing the value -99999
df = df[~df.isin([-99999]).any(axis=1)]

# Separate features and target
X = df.drop(columns=['Credit_Score'])
y = df['Credit_Score']

# Convert categorical columns to one-hot encoding
X_encoded = pd.get_dummies(X, drop_first=True)

# In this version, we consider all available features
selected_features = X_encoded.columns  # all features are used
print("Selected Features:", selected_features.tolist())

# Since we're using all features, there are no dropped features.
dropped_features = []
print("Dropped Features:", dropped_features)

# Use the full one-hot encoded features for training/testing
X_new = X_encoded.copy()

# Splitting the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X_new, y, test_size=0.2, random_state=42)

# Convert to DataFrame if they're NumPy arrays
X_train_df = pd.DataFrame(X_train, columns=X_encoded.columns)
X_test_df = pd.DataFrame(X_test, columns=X_encoded.columns)
y_train_df = pd.DataFrame(y_train, columns=["Credit_Score"])
y_test_df = pd.DataFrame(y_test, columns=["Credit_Score"])

# Save each one to a file (CSV, Excel, or pickle). Here’s an example with CSV:
X_train_df.to_csv("X_train.csv", index=False)
X_test_df.to_csv("X_test.csv", index=False)
y_train_df.to_csv("y_train.csv", index=False)
y_test_df.to_csv("y_test.csv", index=False)

print("Saved training and testing sets to CSV files.")

# Running the linear regression model
model = LinearRegression()
model.fit(X_train, y_train)

# Save the trained model to disk
model_filename = 'credit_score_model_v2.pkl'
joblib.dump(model, model_filename)
print(f"\nModel saved as {model_filename}")

# Model predictions on testing set
y_pred = model.predict(X_test)

# Display the regression formula (for all features)
coefficients = model.coef_
intercept = model.intercept_

print("\nRegression Formula:")
formula = f"Credit_Score = {intercept:.2f} " + " + ".join(
    [f"{coef:.2f}*{feature}" for coef, feature in zip(coefficients, selected_features)]
)
print(formula)

# Model performance: R^2 Score
r2 = r2_score(y_test, y_pred)
print("\nR^2 Score:", r2)

# Create an interactive Plotly figure for Actual vs. Predicted Credit Scores over Test Data
import plotly.graph_objects as go

# Create an index for each test sample as x-axis
x_axis = np.arange(len(y_test))

fig = go.Figure()

# Add actual credit scores as a red line
fig.add_trace(go.Scatter(
    x=x_axis, 
    y=y_test, 
    mode='lines',
    name='Actual Credit Score',
    line=dict(color='red')
))

# Add predicted credit scores as a blue line
fig.add_trace(go.Scatter(
    x=x_axis, 
    y=y_pred, 
    mode='lines',
    name='Predicted Credit Score',
    line=dict(color='blue')
))

fig.update_layout(
    title="Actual vs. Predicted Credit Scores over Test Data",
    xaxis_title="Data Entry",
    yaxis_title="Credit Score",
    hovermode="x",
)

fig.show()

# Plot: Residuals Distribution using seaborn
residuals = y_test - y_pred
plt.figure(figsize=(8, 6))
sns.histplot(residuals, kde=True)
plt.xlabel("Residuals")
plt.title("Residuals Distribution")
plt.show()

# Example input for prediction: 
# Note: This input must have all the features (matching the one-hot encoded format).
# Adjust the dictionary below to include all necessary features.
input_data = pd.DataFrame({
    'Age_Oldest_TL': [156],
    'num_std': [24],
    'num_std_6mts': [6],
    'num_std_12mts': [12],
    'enq_L6m': [1],
    'enq_L3m': [0],
    'Approved_Flag_P4': [0]
})

# If your one-hot encoding created additional columns, you'll need to provide values for those.
# For demonstration, we select only the columns that exist in input_data and in selected_features.
common_features = [feat for feat in selected_features if feat in input_data.columns]
predicted_score = model.predict(input_data[common_features])
print("\nPredicted Credit Score for the input data:", predicted_score[0])

# Display the maximum Credit Score from the dataset
print("\nMaximum Credit Score in the dataset:", max(df['Credit_Score']))
