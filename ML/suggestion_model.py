import pandas as pd
import numpy as np
import joblib

# Load model
model = joblib.load(r"C:\Users\Diya\Score_Savvy\ML\Random Forest\credit_score_rf_model.pkl")

# Load X_train to understand normal ranges
X_train = pd.read_csv(r"C:\Users\Diya\Score_Savvy\ML\Data\X_train.csv")

def generate_suggestions(user_input: dict, top_n: int = 5):
    """
    Suggest features to increase or decrease to improve credit score.

    Args:
        user_input (dict): One user's input features (same as model input format)
        top_n (int): Number of top impactful features to return

    Returns:
        predicted_score (float): Model's current prediction
        suggestions (list): List of feature recommendations
    """

    # Convert user input to DataFrame
    user_df = pd.DataFrame([user_input])
    base_score = model.predict(user_df)[0]

    suggestions = []

    for feature in user_df.columns:
        current_val = user_df[feature].values[0]

        # Simulate +1 and -1 changes (only if the feature is numeric)
        if np.issubdtype(user_df[feature].dtype, np.number):
            user_df[feature] = current_val + 1
            score_up = model.predict(user_df)[0]

            user_df[feature] = current_val - 1
            score_down = model.predict(user_df)[0]

            # Reset to original
            user_df[feature] = current_val

            # Choose the direction that improves score the most
            impact_up = score_up - base_score
            impact_down = score_down - base_score

            if max(impact_up, impact_down) < 0.5:
                continue  # Skip features with too little impact

            if impact_up > impact_down:
                suggestions.append({
                    "feature": feature,
                    "direction": "increase",
                    "impact": round(impact_up, 2),
                    "new_value": current_val + 1
                })
            else:
                suggestions.append({
                    "feature": feature,
                    "direction": "decrease",
                    "impact": round(abs(impact_down), 2),
                    "new_value": current_val - 1
                })

    # Sort by impact
    suggestions = sorted(suggestions, key=lambda x: x["impact"], reverse=True)[:top_n]

    return base_score, suggestions

if __name__ == "__main__":
    # Load a sample user from X_test
    user_df = pd.read_csv(r"C:\Users\Diya\Score_Savvy\ML\Data\X_test.csv")
    sample_user = user_df.iloc[0].to_dict()

    score, recs = generate_suggestions(sample_user)

    print(f"\n📊 Predicted Score: {score:.2f}")
    print("🔁 Top Suggestions:")
    for r in recs:
        print(f"• {r['direction']} '{r['feature']}' to {r['new_value']} (Estimated impact: +{r['impact']})")








