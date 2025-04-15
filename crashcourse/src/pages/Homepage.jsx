import React, { useEffect, useState } from "react";
// import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Middle from "../components/Middle";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";
import axios from "axios";

function HomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // State to store user data
  const [error, setError] = useState(""); // State for error messages

  useEffect(() => {
    // Function to fetch user data
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve JWT from local storage
        if (!token) {
          setError("No token found. Please sign in again.");
          return;
        }

        // Make a GET request to FastAPI backend to fetch user data
        const response = await axios.get("http://127.0.0.1:8000/auth/user", {
          headers: {
            Authorization: Bearer ${token}, // Attach token in Authorization header
          },
        });

        setUser(response.data); // Store user data in state
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to fetch user data. Please try again.");
      }
    };

    fetchUserData(); // Call the function on component mount
  }, []);

  return (
    <div className=" text-white min-h-screen">
      <Navbar />

      {/* Hero Section (Deeper Navy Gradient for Depth) */}
      <div className="w-full bg-gradient-to-b from-[#161A30] to-[#0d1d3e]  text-center py-20 relative border-b-2">
        {/* Faint Glowing Effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r  from-[#1A2332] to-[#0D1321] opacity-30 blur-2xl"></div>

        <h1 className="text-5xl font-extrabold  text-[#E6E9F0] relative z-10">Welcome to SCORESAVY</h1>
        <p className="mt-4 text-lg text-gray-200 relative z-10">
          Your AI-powered Credit Score & Financial Analysis Platform
        </p>

        <button  onClick={() => navigate("/creditscore")} className="mt-6  bg-[#c1dfe5] shadow-teal-100
          hover:shadow-lg   text-blue-950 px-8 py-3 
          rounded-lg text-lg font-semibold border-2 border-black
            relative z-10 transition duration-300 transform hover:scale-105
">
          Check Your Credit Score
        </button>
      </div>

      {/* Feature Section (Better Contrast) */}
     

      {/* How It Works Section (Refined Colors) */}
      <HowItWorks />
      <Middle />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomePage;


