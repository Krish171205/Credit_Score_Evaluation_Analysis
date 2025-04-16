import numpy as np
import pandas as pd
import random
import gym
from gym import spaces
import tensorflow as tf
from tensorflow.keras import layers, models, optimizers
import warnings

# Optionally ignore warnings (useful for debugging)
warnings.filterwarnings("ignore")

# =========================
# Data Loading and Preprocessing
# =========================
# Load training data from CSV files:
x_train = pd.read_csv(r"c:\Users\krish\OneDrive\Desktop\PBL\ML\Data\X_train.csv")
y_train = pd.read_csv(r"c:\Users\krish\OneDrive\Desktop\PBL\ML\Data\y_train.csv")
# Note: In this example, we assume x_train contains all customer features
# (including the CIBIL score as the last feature). y_train is not directly used
# in training the RL agent but could be useful in a broader project context.

# For now, we use the CSV data and later, you can replace this part with MongoDB fetch logic.

# =========================
# Define the Custom Environment
# =========================
class LoanInterestEnv(gym.Env):
    """
    Custom environment for selecting a minimum interest rate based on customer data.
    The state is composed of the customer's feature vector with the loan amount appended.
    The action is selecting an interest rate from a discretized list.
    The reward penalizes selections below a computed minimum required rate.
    """
    def __init__(self, customer_info, loan_amount):
        super(LoanInterestEnv, self).__init__()
        self.customer_info = customer_info
        self.loan_amount = loan_amount

        # Discrete action space: interest rate options from 0% to 50% in 0.5% steps.
        self.interest_rate_options = np.arange(0, 50.5, 0.5)
        self.action_space = spaces.Discrete(len(self.interest_rate_options))
        
        # Observation space: customer features with the loan amount appended.
        self.state = np.concatenate([self.customer_info, [loan_amount]])
        self.observation_space = spaces.Box(low=-np.inf, high=np.inf, shape=self.state.shape, dtype=np.float32)
        self.done = False

    def step(self, action):
        interest_rate = self.interest_rate_options[action]
        # Assume the last element of customer_info is the CIBIL score.
        cibil_score = self.customer_info[-1]
        
        # Calculate the minimum required interest rate.
        base_rate = 3.0  # Base market rate.
        risk_factor = 10.0  # Risk premium factor.
        if cibil_score < 700:
            min_required_rate = base_rate + risk_factor * ((700 - cibil_score) / 700)
        else:
            min_required_rate = base_rate

        # Penalize the agent heavily if it offers less than the minimum required rate.
        if interest_rate < min_required_rate:
            reward = -100.0
        else:
            reward = -interest_rate  # Lower interest rate (above minimum) is more desirable.

        self.done = True  # Single-step environment.
        info = {"interest_rate": interest_rate, "min_required_rate": min_required_rate}
        return self.state, reward, self.done, info

    def reset(self):
        self.done = False
        self.state = np.concatenate([self.customer_info, [self.loan_amount]])
        return self.state


# =========================
# DQN Agent Implementation
# =========================
class DQNAgent:
    def __init__(self, state_size, action_size):
        self.state_size = state_size
        self.action_size = action_size

        # Hyperparameters.
        self.gamma = 0.95
        self.epsilon = 1.0
        self.epsilon_min = 0.01
        self.epsilon_decay = 0.995
        self.learning_rate = 0.001

        # Experience replay buffer.
        self.memory = []
        self.max_memory = 2000

        self.model = self._build_model()

    def _build_model(self):
        # Build a simple neural network using Keras.
        model = models.Sequential()
        model.add(layers.Dense(24, input_dim=self.state_size, activation='relu'))
        model.add(layers.Dense(24, activation='relu'))
        model.add(layers.Dense(self.action_size, activation='linear'))
        model.compile(loss='mse', optimizer=optimizers.Adam(learning_rate=self.learning_rate))
        return model

    def remember(self, state, action, reward, next_state, done):
        if len(self.memory) >= self.max_memory:
            self.memory.pop(0)
        self.memory.append((state, action, reward, next_state, done))

    def act(self, state):
        # Use ε–greedy policy for action selection.
        if np.random.rand() <= self.epsilon:
            return random.randrange(self.action_size)
        q_values = self.model.predict(state[np.newaxis, :], verbose=0)
        return np.argmax(q_values[0])

    def replay(self, batch_size):
        minibatch = random.sample(self.memory, min(batch_size, len(self.memory)))
        for state, action, reward, next_state, done in minibatch:
            target = reward
            if not done:
                target = reward + self.gamma * np.amax(self.model.predict(next_state[np.newaxis, :], verbose=0)[0])
            target_f = self.model.predict(state[np.newaxis, :], verbose=0)
            target_f[0][action] = target
            self.model.fit(state[np.newaxis, :], target_f, epochs=1, verbose=0)
        if self.epsilon > self.epsilon_min:
            self.epsilon *= self.epsilon_decay


# =========================
# Training the DQN Agent
# =========================
def train_dqn(episodes=1000, batch_size=32):
    # For demonstration, use the first entry from x_train.
    example_customer = x_train.iloc[0].values.astype(np.float32)
    loan_amount = 100000.0  # Sample loan amount for training.

    env = LoanInterestEnv(example_customer, loan_amount)
    state_size = env.observation_space.shape[0]
    action_size = env.action_space.n

    agent = DQNAgent(state_size, action_size)
    
    for e in range(episodes):
        state = env.reset()
        action = agent.act(state)
        next_state, reward, done, info = env.step(action)
        agent.remember(state, action, reward, next_state, done)
        agent.replay(batch_size)
        if (e+1) % 100 == 0:
            print(f"Episode {e+1}/{episodes} - Reward: {reward:.2f}, Chosen Rate: {info['interest_rate']:.2f}%, Min Required Rate: {info['min_required_rate']:.2f}%")
            
    # Save the trained model as a .keras file.
    agent.model.save("trained_dqn.keras")
    print("Model saved as 'trained_dqn.keras'")
    return agent


# =========================
# Example: Using the Trained Agent to Predict Rate for a New Customer from CSV Data
# =========================
def get_minimum_interest_rate_from_csv(customer_features, loan_amount, agent):
    """
    Given a customer feature vector (from CSV) and a loan amount, use the trained agent to select the minimum interest rate.
    """
    env = LoanInterestEnv(customer_features, loan_amount)
    state = env.reset()
    action = agent.act(state)
    interest_rate = env.interest_rate_options[action]
    _, _, _, info = env.step(action)
    return interest_rate, info


# =========================
# Main Execution Block
# =========================
if __name__ == "__main__":
    # Train the DQN agent on CSV data.
    trained_agent = train_dqn(episodes=1000, batch_size=32)

    # Example usage: Using a customer record from the CSV file.
    # For demonstration, we use the second customer entry (adjust the index as needed).
    test_customer_features = x_train.iloc[1].values.astype(np.float32)
    test_loan_amount = 50000.0  # Example loan amount

    rate, info = get_minimum_interest_rate_from_csv(test_customer_features, test_loan_amount, trained_agent)
    print(f"Offered Minimum Interest Rate: {rate:.2f}%")
    print("Detailed Info:", info)
