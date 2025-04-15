import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { CheckCircle2 } from "lucide-react";

const CreditScorePage = () => {
  const [creditScore, setCreditScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const generateSuggestions = (score) => {
    if (score >= 750) {
      return [
        "Keep credit utilization below 30%",
        "Pay bills on time consistently",
        "Maintain a diverse credit mix",
        "Monitor your credit report regularly",
      ];
    } else if (score >= 650) {
      return [
        "Reduce outstanding debt",
        "Pay bills on time",
        "Avoid frequent credit inquiries",
        "Keep utilization moderate",
      ];
    } else if (score >= 550) {
      return [
        "Make payments on time",
        "Limit new credit requests",
        "Start budgeting better",
        "Lower credit utilization",
      ];
    } else {
      return [
        "Avoid unnecessary loans",
        "Pay off debt quickly",
        "Set up auto-pay to avoid late payments",
        "Seek financial advice if needed",
      ];
    }
  };

  const getScoreText = (score) => {
    if (score >= 750) return "Very Good";
    if (score >= 650) return "Good";
    if (score >= 550) return "Fair";
    return "Poor";
  };

  const handleCheckScore = () => {
    setLoading(true);
    setTimeout(() => {
      const randomScore = Math.floor(Math.random() * (850 - 300 + 1)) + 300;
      setCreditScore(randomScore);
      setSuggestions(generateSuggestions(randomScore));
      setLoading(false);
    }, 2000);
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#0A0E17] to-[#192A45] text-white p-6 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#131D34] to-[#0A0E17] opacity-30 blur-3xl" />
        <h1 className="text-5xl font-extrabold text-cyan-400 mb-4 z-10">
          Your Credit Report
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full z-10">
          {/* Credit Score Section */}
          <div className="bg-[#111827] rounded-2xl p-8 shadow-xl border border-gray-700 flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold mb-4">Credit Score 📈</h2>

            <div className="relative w-48 h-48 bg-gradient-to-br from-[#00BFFF] to-[#008CFF] rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-lg">
              {creditScore !== null ? (
                <span>{creditScore}</span>
              ) : (
                <span>---</span>
              )}
              <div className="absolute bottom-4 text-sm font-medium text-white">
                out of 900
              </div>
            </div>

            {creditScore !== null && (
              <p className="mt-6 text-lg font-medium">
                Your credit score is{" "}
                <span className="text-cyan-400 font-bold">
                  {getScoreText(creditScore)}
                </span>
              </p>
            )}

            <button
              onClick={handleCheckScore}
              disabled={loading}
              className="mt-6 bg-gradient-to-r from-[#00BFFF] to-[#008CFF] hover:shadow-lg text-white font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105"
            >
              {loading ? "Fetching..." : "Check Score"}
            </button>
          </div>

          {/* Recommendations */}
          <div className="bg-[#111827] rounded-2xl p-8 shadow-xl border border-gray-700">
            <h2 className="text-2xl font-bold mb-6">Recommendations</h2>
            <ul className="space-y-4">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-3 text-base">
                  <CheckCircle2 className="text-green-400 mt-1" />
                  <span className="text-gray-300">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Link
          to="/home"
          className="mt-10 text-cyan-400 text-lg font-semibold hover:underline z-10"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default CreditScorePage;
