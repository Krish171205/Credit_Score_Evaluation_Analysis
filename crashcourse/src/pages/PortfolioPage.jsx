import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import Navbar from "../components/Navbar";

const PortfolioPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [address, setAddress] = useState("");
  const [panCard, setPanCard] = useState("");
  const [employerType, setEmployerType] = useState("");
  const [professionType, setProfessionType] = useState("");
  const [annualIncome, setAnnualIncome] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const savedPortfolio = JSON.parse(localStorage.getItem("portfolio"));
    if (savedPortfolio) {
      setName(savedPortfolio.name);
      setEmail(savedPortfolio.email);
      setBirthDate(savedPortfolio.birthDate);
      setPinCode(savedPortfolio.pinCode);
      setAddress(savedPortfolio.address);
      setPanCard(savedPortfolio.panCard);
      setEmployerType(savedPortfolio.employerType);
      setProfessionType(savedPortfolio.professionType);
      setAnnualIncome(savedPortfolio.annualIncome);
    }
  }, []);

  const fetchAddress = async (pin) => {
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      const data = await response.json();
      if (data[0].Status === "Success") {
        const postOffice = data[0].PostOffice[0];
        const fullAddress = `${postOffice.Name}, ${postOffice.District}, ${postOffice.State}`;
        setAddress(fullAddress);
      } else {
        setAddress("Invalid PIN Code");
      }
    } catch (error) {
      setAddress("Error fetching address");
    }
  };

  useEffect(() => {
    if (pinCode.length === 6) {
      fetchAddress(pinCode);
    }
  }, [pinCode]);

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const panCardRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const pinCodeRegex = /^[0-9]{6}$/;

    if (!name || !email || !birthDate || !pinCode || !panCard || !employerType || !professionType || !annualIncome) {
      setError("All fields are required!");
      return false;
    }
    if (!emailRegex.test(email)) {
      setError("Invalid email format!");
      return false;
    }
    if (!panCardRegex.test(panCard)) {
      setError("Invalid PAN Card format!");
      return false;
    }
    if (!pinCodeRegex.test(pinCode)) {
      setError("PIN Code must be 6 digits!");
      return false;
    }
    setError("");
    return true;
  };

  const savePortfolio = () => {
    if (!validateInputs()) return;
    const portfolioData = {
      name,
      email,
      birthDate,
      pinCode,
      address,
      panCard,
      employerType,
      professionType,
      annualIncome,
    };
    localStorage.setItem("portfolio", JSON.stringify(portfolioData));
    alert("Portfolio details saved successfully!");
  };

  const generatePDF = () => {
    if (!validateInputs()) return;
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("User Portfolio", 20, 20);
    doc.setFontSize(12);
    doc.text(`Name: ${name}`, 20, 40);
    doc.text(`Email: ${email}`, 20, 50);
    doc.text(`Birth Date: ${birthDate}`, 20, 60);
    doc.text(`PIN Code: ${pinCode}`, 20, 70);
    doc.text(`Address: ${address}`, 20, 80);
    doc.text(`PAN Card: ${panCard}`, 20, 90);
    doc.text(`Employer Type: ${employerType}`, 20, 100);
    doc.text(`Profession Type: ${professionType}`, 20, 110);
    doc.text(`Annual Income: ₹${annualIncome}`, 20, 120);
    doc.save("User_Portfolio.pdf");
  };
  

  return (
    <div>
      <Navbar/>

    <div className="min-h-screen bg-[#0D1117] text-white px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold text-center text-[#3DDCFF] mb-4">User Portfolio</h1>

        {/* Personal Info Section */}
        <div className="bg-[#161B22] rounded-2xl p-6 shadow-md border border-[#3DDCFF]/20">
          <h2 className="text-2xl font-semibold text-[#3DDCFF] mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input label="Full Name" value={name} onChange={setName} autoComplete="name" />
            <Input label="Email" type="email" value={email} onChange={setEmail} autoComplete="email" name="email" />
            <Input label="Birth Date" type="date" value={birthDate} onChange={setBirthDate} autoComplete="bday" />
            <Input
              label="PAN Card"
              value={panCard}
              onChange={(val) => setPanCard(val.toUpperCase())}
              placeholder="ABCDE1234F"
              autoComplete="off"
            />
          </div>
        </div>

        {/* Address Section */}
        <div className="bg-[#161B22] rounded-2xl p-6 shadow-md border border-[#3DDCFF]/20">
          <h2 className="text-2xl font-semibold text-[#3DDCFF] mb-4">Address Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input label="PIN Code" value={pinCode} onChange={setPinCode} placeholder="6-digit PIN Code" autoComplete="postal-code" />
            <Input label="Auto-Filled Address" value={address} readOnly />
          </div>
        </div>

        {/* Professional Section */}
        <div className="bg-[#161B22] rounded-2xl p-6 shadow-md border border-[#3DDCFF]/20">
          <h2 className="text-2xl font-semibold text-[#3DDCFF] mb-4">Professional Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Employer Type Dropdown */}
            <div>
              <label className="block mb-1 text-sm font-medium text-[#3DDCFF]">Employer Type</label>
              <select
                value={employerType}
                onChange={(e) => setEmployerType(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#0D1117] border border-[#3DDCFF]/30 focus:outline-none focus:ring-2 focus:ring-[#3DDCFF] text-white"
              >
                <option value="">Select Employer Type</option>
                <option value="Government">Government</option>
                <option value="Private">Private</option>
                <option value="Self-Employed">Self-Employed</option>
                <option value="Freelancer">Freelancer</option>
                <option value="Student">Student</option>
                <option value="Retired">Retired</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            {/* Profession Type Dropdown */}
            <div>
              <label className="block mb-1 text-sm font-medium text-[#3DDCFF]">Profession Type</label>
              <select
                value={professionType}
                onChange={(e) => setProfessionType(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#0D1117] border border-[#3DDCFF]/30 focus:outline-none focus:ring-2 focus:ring-[#3DDCFF] text-white"
              >
                <option value="">Select Profession Type</option>
                <option value="Engineer">Engineer</option>
                <option value="Doctor">Doctor</option>
                <option value="Teacher">Teacher</option>
                <option value="Teacher">Student</option>
                <option value="Designer">Designer</option>
                <option value="Scientist">Scientist</option>
                <option value="Artist">Artist</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <Input label="Annual Income (₹)" type="number" value={annualIncome} onChange={setAnnualIncome} />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-6">
          <button onClick={savePortfolio} className="bg-[#3DDCFF] text-black font-semibold px-6 py-2 rounded-full hover:opacity-90">
            Save
          </button>
          <button onClick={generatePDF} className="bg-green-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-green-600">
            Download PDF
          </button>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}
      </div>
    </div>
    </div>
  );
};

// Reusable Input Component
const Input = ({ label, value, onChange, type = "text", placeholder = "", readOnly = false, autoComplete = "on", name }) => (
  <div>
    <label className="block mb-1 text-sm font-medium text-[#3DDCFF]">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      readOnly={readOnly}
      placeholder={placeholder}
      autoComplete={autoComplete}
      name={name}
      className={`w-full px-4 py-2 rounded-lg bg-[#0D1117] border border-[#3DDCFF]/30 focus:outline-none focus:ring-2 focus:ring-[#3DDCFF] text-white ${readOnly ? "opacity-60 cursor-not-allowed" : ""}`}
    />
  </div>
);

export default PortfolioPage;
