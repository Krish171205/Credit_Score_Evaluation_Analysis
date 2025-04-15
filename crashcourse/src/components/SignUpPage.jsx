import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:8000/auth/signup", {
        email: email,
        password: password,
      });

      // Redirect to sign-in page
      navigate("/signin");
    } catch (err) {
      setError("Email already registered");
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <label className="block text-gray-300 text-sm mb-2">Email ID</label>
        <input
          type="email"
          name="email"
          className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-cyan-400"
          placeholder="Enter your email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-gray-300 text-sm mb-2">Password</label>
        <input
          type="password"
          name="password"
          className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-cyan-400"
          placeholder="Create a password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-cyan-400 text-white py-3 rounded-lg font-semibold hover:shadow-lg shadow-blue-400"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignUpPage;