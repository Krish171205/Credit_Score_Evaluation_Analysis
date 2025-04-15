import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./components/Welcomepage";
import Homepage from "./pages/Homepage";
import Features from "./pages/Features";
import Approval from "./pages/Approval";
import AboutUs from "./pages/AboutUs";
import Checkholdings from "./pages/Checkholdings";
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUpPage";
import PortfolioPage from "./pages/PortfolioPage";
import CreditScorePage from "./pages/CreditScorePage";
const App = () => {

  
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        {/* <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} /> */}
        <Route path="/home" element={<Homepage/>} />
        <Route path="/features" element={<Features/>}/>
        <Route path="/features/approval" element={<Approval />} />
        <Route path="/aboutus" element={<AboutUs/>}/>
        <Route path="/checkholdings" element={<Checkholdings/>}/>
        <Route path="/portfolio" element={<PortfolioPage />} /> 
        <Route path="/creditscore" element={<CreditScorePage />} /> {/* ✅ Add this */}
  
   
      </Routes>
    </Router>
  );
};

export default App;
