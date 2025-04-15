import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import joblib
import math

from sklearn.metrics import (
    r2_score,
    mean_squared_error,
    mean_absolute_error
)

# ------------------------------------------------------------------------
# 1. Load the trained model
# ------------------------------------------------------------------------
model = joblib.load("credit_score_model_v2.pkl")

# ------------------------------------------------------------------------
# 2. Load the test data from CSV files
# ------------------------------------------------------------------------
X_test = pd.read_csv("X_test.csv")
y_test = pd.read_csv("y_test.csv")

# If y_test is loaded as a DataFrame with a column name (e.g., "Credit_Score"), extract the series.
if 'Credit_Score' in y_test.columns:
    y_test = y_test["Credit_Score"]

# Optionally, check the shapes
print("X_test shape:", X_test.shape)
print("y_test shape:", y_test.shape)

# ------------------------------------------------------------------------
# 3. Generate predictions
# ------------------------------------------------------------------------
y_pred = model.predict(X_test)

# ------------------------------------------------------------------------
# 4. Compute Metrics
# ------------------------------------------------------------------------
r2 = r2_score(y_test, y_pred)
mse = mean_squared_error(y_test, y_pred)
rmse = math.sqrt(mse)
mae = mean_absolute_error(y_test, y_pred)

# Print them to console (optional)
print("R^2 Score:", r2)
print("MSE:", mse)
print("RMSE:", rmse)
print("MAE:", mae)

# ------------------------------------------------------------------------
# 5. Save metrics to Excel
# ------------------------------------------------------------------------
metrics_df = pd.DataFrame({
    "Metric": ["R^2", "MSE", "RMSE", "MAE"],
    "Value": [r2, mse, rmse, mae]
})
metrics_df.to_excel("model_evaluation_metrics.xlsx", index=False)
print("\nMetrics have been saved to model_evaluation_metrics.xlsx")

# ------------------------------------------------------------------------
# 6. Create and save plots
# ------------------------------------------------------------------------

# (A) Actual vs. Predicted (Scatter/Line Plot)
plt.figure(figsize=(10, 6))
plt.plot(np.arange(len(y_test)), y_test, label="Actual", color="red")
plt.plot(np.arange(len(y_pred)), y_pred, label="Predicted", color="blue")
plt.title("Actual vs. Predicted Credit Scores")
plt.xlabel("Data Point Index")
plt.ylabel("Credit Score")
plt.legend()
plt.tight_layout()
plt.savefig("actual_vs_predicted.png", dpi=300)
plt.close()
print("Saved plot: actual_vs_predicted.png")

# (B) Residual Distribution
residuals = y_test - y_pred
plt.figure(figsize=(10, 6))
sns.histplot(residuals, kde=True)
plt.title("Residual Distribution")
plt.xlabel("Residual (Actual - Predicted)")
plt.ylabel("Count")
plt.tight_layout()
plt.savefig("residual_distribution.png", dpi=300)
plt.close()
print("Saved plot: residual_distribution.png")

# (C) Residuals vs. Predicted
plt.figure(figsize=(10, 6))
plt.scatter(y_pred, residuals, alpha=0.6)
plt.hlines(y=0, xmin=y_pred.min(), xmax=y_pred.max(), colors="r", linestyles="dashed")
plt.title("Residuals vs. Predicted")
plt.xlabel("Predicted Credit Score")
plt.ylabel("Residual (Actual - Predicted)")
plt.tight_layout()
plt.savefig("residuals_vs_predicted.png", dpi=300)
plt.close()
print("Saved plot: residuals_vs_predicted.png")

print("\nAll plots have been saved.")
