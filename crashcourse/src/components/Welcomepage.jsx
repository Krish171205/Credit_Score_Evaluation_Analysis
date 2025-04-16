import React, { useState } from "react";
import { motion } from "framer-motion";
import welcomeImage from "../assets/welcomepage3.jpg";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";

const Welcomepage = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-950">
      {/* Main Container with Dynamic Height */}
      <motion.div
        className="flex w-[850px] bg-gray-800 shadow-lg rounded-2xl overflow-hidden border border-cyan-500"
        style={{ height: isSignIn ? "550px" : "550px" }} // Dynamically adjust height
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Left Side - Animated Floating Image */}
        <motion.div
          className="w-1/2 flex items-center justify-center"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
        >
          <img
            src={welcomeImage}
            alt="AI Analysis"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Right Side - Login Form Section */}
        <div className="w-1/2 flex items-center justify-center bg-gray-900 p-6">
          <motion.div
            className="w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-center text-3xl font-bold text-cyan-400 mb-6">
              SCORESAVY
            </h1>

            {/* Sign In / Sign Up Tabs */}
            <div className="flex justify-center gap-6 text-white text-lg mb-6">
              <motion.button
                className={`pb-2 ${
                  isSignIn
                    ? "border-b-2 border-cyan-400"
                    : "hover:text-cyan-400"
                }`}
                onClick={() => setIsSignIn(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.button>
              <motion.button
                className={`pb-2 ${
                  !isSignIn
                    ? "border-b-2 border-cyan-400"
                    : "hover:text-cyan-400"
                }`}
                onClick={() => setIsSignIn(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Up
              </motion.button>
            </div>

            {/* Dynamic Page Load */}
            {isSignIn ? <SignInPage /> : <SignUpPage />}

            {/* Terms & Privacy */}
            <p className="text-gray-400 text-xs text-center mt-6">
              By continuing, you agree to our{" "}
              <a href="#" className="text-cyan-400 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-cyan-400 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Welcomepage;
