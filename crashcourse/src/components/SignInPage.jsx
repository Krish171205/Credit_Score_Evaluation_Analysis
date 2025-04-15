import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/signin",
        new URLSearchParams({
          username: email,
          password: password,
        })
      );

      // Save token to local storage
      localStorage.setItem("token", response.data.access_token);

      // Redirect to home page
      navigate("/home");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit} autoComplete="on">
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <label className="block text-gray-100 text-sm mb-2">Email ID</label>
        <input
          type="email"
          name="email"
          className="w-full px-4 py-3 bg-gray-600 text-white rounded-lg focus:ring-2 focus:ring-cyan-400"
          placeholder="Enter your email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-gray-100 text-sm mb-2">Password</label>
        <input
          type="password"
          name="password"
          className="w-full px-4 py-3 bg-gray-600 text-white rounded-lg focus:ring-2 focus:ring-cyan-400"
          placeholder="Enter your password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-cyan-400 text-white py-3 rounded-lg font-semibold hover:shadow-lg shadow-blue-400"
      >
        Sign In
      </button>
    </form>
  );
};

export default SignInPage;