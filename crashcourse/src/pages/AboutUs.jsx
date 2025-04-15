// import React from "react";

// const AboutUs = () => {
//   return (
//     <div className="bg-[#0A0A0A] text-white min-h-screen flex flex-col items-center justify-center px-6">
//       <div className="max-w-4xl text-center">
//         <h1 className="text-4xl md:text-5xl font-bold text-[#00FFFF] mb-6">
//           About Us
//         </h1>
//         <p className="text-lg md:text-xl text-gray-300">
//           Welcome to <span className="text-[#00FFFF] font-semibold">SCORESAVY</span> – Your Smart Credit Companion.  
//           Our AI-powered platform simplifies credit scoring, offering accurate insights to help you make informed financial decisions.
//         </p>

//         <div className="mt-10">
//           <h2 className="text-3xl font-semibold text-[#00FFFF]">Our Mission</h2>
//           <p className="text-gray-300 mt-3">
//             We empower users with data-driven credit analysis, helping them improve financial literacy and decision-making.
//           </p>
//         </div>

//         <div className="mt-10">
//           <h2 className="text-3xl font-semibold text-[#00FFFF]">What We Offer</h2>
//           <ul className="text-gray-300 mt-3 space-y-2 text-left md:text-center">
//             <li>✅ <span className="text-[#00FFFF] font-semibold">AI-Driven Credit Scoring</span> – Accurate, intelligent credit analysis.</li>
//             <li>✅ <span className="text-[#00FFFF] font-semibold">Data Visualization</span> – Interactive dashboards for better insights.</li>
//             <li>✅ <span className="text-[#00FFFF] font-semibold">Smart Insights</span> – Personalized recommendations for credit improvement.</li>
//             <li>✅ <span className="text-[#00FFFF] font-semibold">Secure & Reliable</span> – Your data is safe with us.</li>
//           </ul>
//         </div>

//         <div className="mt-10">
//           <h2 className="text-3xl font-semibold text-[#00FFFF]">Why Choose Us?</h2>
//           <ul className="text-gray-300 mt-3 space-y-2 text-left md:text-center">
//             <li>🔹 <span className="text-[#00FFFF] font-semibold">Advanced AI Technology</span> – Real-time, accurate credit assessments.</li>
//             <li>🔹 <span className="text-[#00FFFF] font-semibold">User-Centric Design</span> – Seamless and intuitive experience.</li>
//             <li>🔹 <span className="text-[#00FFFF] font-semibold">Data Transparency</span> – Clear insights into your credit health.</li>
//           </ul>
//         </div>

//         <div className="mt-10">
//           <h2 className="text-3xl font-semibold text-[#00FFFF]">Unlock Your Financial Potential with SCORESAVY!</h2>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutUs;
// ContactUs.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/Navbar";


const AboutUs = () => {
  return (
    <div>
      <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-[#0c0c1e] to-[#1a1a3c] text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-5xl font-bold text-[#00f0ff] mb-10">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl">
        {/* Email */}
        <div className="bg-[#121236] border border-[#00f0ff] rounded-2xl px-10 py-12 shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-[0_0_25px_#00f0ff] text-center">
          <FontAwesomeIcon icon={faEnvelope} size="2x" className="text-[#00f0ff] mb-6" />
          <h3 className="text-2xl font-semibold mb-3">Email</h3>
          <p className="text-lg">savvyscore29@gmail.com</p>
        </div>

        {/* Phone */}
        <div className="bg-[#121236] border border-[#00f0ff] rounded-2xl px-10 py-12 shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-[0_0_25px_#00f0ff] text-center">
          <FontAwesomeIcon icon={faPhone} size="2x" className="text-[#00f0ff] mb-6" />
          <h3 className="text-2xl font-semibold mb-3">Phone</h3>
          <p className="text-lg">+91 9920081681</p>
        </div>

        {/* Address */}
        <div className="bg-[#121236] border border-[#00f0ff] rounded-2xl px-10 py-12 shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-[0_0_25px_#00f0ff] text-center">
          <FontAwesomeIcon icon={faMapMarkerAlt} size="2x" className="text-[#00f0ff] mb-6" />
          <h3 className="text-2xl font-semibold mb-3">Address</h3>
          <p className="text-lg">PICT Pune</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AboutUs;
