
// import React from "react";
// import { Link } from "react-router-dom";

// function Navbar() {
//   return (
//     <nav className="w-full bg-[#021526] text-white px-16 py-5 flex justify-between items-center shadow-md">
//       {/* Logo */}
//       <Link to="/" className="text-3xl font-bold text-blue-300">SCORESAVY</Link>

//       {/* Navigation Links */}
//       <div className="flex space-x-10 text-lg font-medium">
//         <Link to="/home" className="hover:text-[#3DDCFF] transition-all">Home</Link>
//         <Link to="/features" className="hover:text-[#3DDCFF] transition-all">Features</Link>
//         <Link to="/credit-score" className="hover:text-[#3DDCFF] transition-all">Credit Score</Link>
//         <Link to="/about" className="hover:text-[#3DDCFF] transition-all">About Us</Link>
//         <Link to="/settings" className="hover:text-[#3DDCFF] transition-all">Settings</Link>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
// import React from "react";
// import { Link } from "react-router-dom";

// function Navbar() {
//   return (
//     <nav className="w-full bg-gradient-to-bl from-[#212c56] to-[#0c2b51] bg-opacity-70 backdrop-blur-md  h-20
//       text-white px-16 py-5 flex justify-between items-center shadow-md  ">
      
//       {/* Logo */}
//       <Link to="/" className="text-3xl font-bold text-[#52cdd8] tracking-wide">SCORESAVY</Link>

//       {/* Navigation Links */}
//       <div className="flex space-x-20 text-lg font-medium">
//         <Link to="/home" className="hover:text-[#3DDCFF] transition-all">Home</Link>
//         <Link to="/features" className="hover:text-[#3DDCFF] transition-all">Features</Link>
//         <Link to="/portfolio" className="hover:text-[#3DDCFF] transition-all">Portfolio</Link>
//         <Link to="/aboutus" className="hover:text-[#3DDCFF] transition-all">About Us</Link>
//         <Link to="/settings" className="hover:text-[#3DDCFF] transition-all">Settings</Link>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken"); // Clear user session
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="w-full bg-gradient-to-bl from-[#121b3f] to-[#0c2b51] bg-opacity-70 backdrop-blur-md h-20 text-white px-16 py-5 flex justify-between items-center shadow-md relative z-50">
      {/* Logo */}
      <Link to="/" className="text-3xl font-bold text-[#52cdd8] tracking-wide">SCORESAVY</Link>

      {/* Navigation Links */}
      <div className="flex space-x-10 text-lg font-medium relative">
        <Link to="/home" className="hover:text-[#3DDCFF] transition-all">Home</Link>
        <Link to="/features" className="hover:text-[#3DDCFF] transition-all">Features</Link>
        {/* <Link to="/portfolio" className="hover:text-[#3DDCFF] transition-all">Portfolio</Link> */}
        <Link to="/aboutus" className="hover:text-[#3DDCFF] transition-all">Contact Us</Link>
        
        {/* Settings Dropdown */}
        <div className="relative">
          <button onClick={() => setShowLogout(!showLogout)} className="hover:text-[#3DDCFF] transition-all">Settings</button>
          {showLogout && (
            <div className="absolute right-0 mt-3 w-30 bg-[#c1dfe5] text-[#070a3b] rounded-lg shadow-lg py-1 border-2 border-[#ebf0f1] z-50 top-full">
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 ">Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
