import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import joblib
import math

from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import r2_score, mean_squared_error, mean_absolute_error

# ------------------------------------------------------------------------
# 1. Load the training and testing data from CSV files
# ------------------------------------------------------------------------
X_train = pd.read_csv("X_train.csv")
y_train = pd.read_csv("y_train.csv")
X_test = pd.read_csv("X_test.csv")
y_test = pd.read_csv("y_test.csv")

# If y_train and y_test are DataFrames with a column name (e.g., "Credit_Score"), extract the series.
if 'Credit_Score' in y_train.columns:
    y_train = y_train["Credit_Score"]
if 'Credit_Score' in y_test.columns:
    y_test = y_test["Credit_Score"]

print("Shapes:")
print("X_train:", X_train.shape)
print("y_train:", y_train.shape)
print("X_test:", X_test.shape)
print("y_test:", y_test.shape)

# ------------------------------------------------------------------------
# 2. Train the Random Forest model
# ------------------------------------------------------------------------
# Create the RandomForestRegressor model
rf_model = RandomForestRegressor(n_estimators=100, random_state=42)

# Fit the model on training data
rf_model.fit(X_train, y_train)

# Save the trained model to disk
model_filename = 'credit_score_rf_model.pkl'
joblib.dump(rf_model, model_filename)
print(f"\nRandom Forest model saved as {model_filename}")

# ------------------------------------------------------------------------
# 3. Generate predictions on testing data
# ------------------------------------------------------------------------
y_pred = rf_model.predict(X_test)

# ------------------------------------------------------------------------
# 4. Compute Metrics
# ------------------------------------------------------------------------
r2 = r2_score(y_test, y_pred)
mse = mean_squared_error(y_test, y_pred)
rmse = math.sqrt(mse)
mae = mean_absolute_error(y_test, y_pred)

print("R^2 Score:", r2)
print("MSE:", mse)
print("RMSE:", rmse)
print("MAE:", mae)

# ------------------------------------------------------------------------
# 5. Save metrics to an Excel file
# ------------------------------------------------------------------------
metrics_df = pd.DataFrame({
    "Metric": ["R^2", "MSE", "RMSE", "MAE"],
    "Value": [r2, mse, rmse, mae]
})
metrics_df.to_excel("rf_model_evaluation_metrics.xlsx", index=False)
print("\nMetrics have been saved to rf_model_evaluation_metrics.xlsx")

# ------------------------------------------------------------------------
# 6. Create and save plots
# ------------------------------------------------------------------------

# (A) Actual vs. Predicted (Line Plot)
plt.figure(figsize=(10, 6))
plt.plot(np.arange(len(y_test)), y_test, label="Actual", color="red")
plt.plot(np.arange(len(y_pred)), y_pred, label="Predicted", color="blue")
plt.title("Actual vs. Predicted Credit Scores (Random Forest)")
plt.xlabel("Data Point Index")
plt.ylabel("Credit Score")
plt.legend()
plt.tight_layout()
plt.savefig("rf_actual_vs_predicted.png", dpi=300)
plt.close()
print("Saved plot: rf_actual_vs_predicted.png")

# (B) Residual Distribution
residuals = y_test - y_pred
plt.figure(figsize=(10, 6))
sns.histplot(residuals, kde=True)
plt.title("Residual Distribution (Random Forest)")
plt.xlabel("Residual (Actual - Predicted)")
plt.ylabel("Count")
plt.tight_layout()
plt.savefig("rf_residual_distribution.png", dpi=300)
plt.close()
print("Saved plot: rf_residual_distribution.png")

# (C) Residuals vs. Predicted
plt.figure(figsize=(10, 6))
plt.scatter(y_pred, residuals, alpha=0.6)
plt.hlines(y=0, xmin=y_pred.min(), xmax=y_pred.max(), colors="r", linestyles="dashed")
plt.title("Residuals vs. Predicted (Random Forest)")
plt.xlabel("Predicted Credit Score")
plt.ylabel("Residual (Actual - Predicted)")
plt.tight_layout()
plt.savefig("rf_residuals_vs_predicted.png", dpi=300)
plt.close()
print("Saved plot: rf_residuals_vs_predicted.png")

print("\nAll plots have been saved.")
