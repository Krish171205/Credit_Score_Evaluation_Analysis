
import { useNavigate } from "react-router-dom";
import { PieChart, ShieldCheck } from "lucide-react"; // Importing Lucide icons
import Navbar from "../components/Navbar";

const Features = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
    <div className="flex flex-col items-center justify-center min-h-screen  bg-[#030919] text-[#6EACDA]  p-8">
      {/* Page Title */}
      {/* <h1 className="text-5xl font-extrabold mb-15 text-[#f6f8fa] drop-shadow-lg animate-pulse">
        Explore Features
      </h1> */}

<h1 className="text-5xl font-extrabold mb-10 text-[#f6f8fa] drop-shadow-[0px_0px_12px_#6EACDA]">
  Explore Features
</h1>


      {/* Feature Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-6">
        
        {/* Check Holdings Feature Card */}
        <div
          className="bg-[#07152f] p-8 rounded-2xl shadow-xl backdrop-blur-lg 
          hover:scale-105 hover:shadow-lg hover:shadow-white transition-all duration-300 cursor-pointer text-center w-80 
          border-2 border-[#f1f3f5] flex flex-col items-center"
          onClick={() => navigate("/checkholdings")}
        >
          <div className="bg-[#07152f] p-3 rounded-full shadow-md mb-4 border border-[#5fa7de]">
            <PieChart size={50} className="text-[#6EACDA]" /> {/* Increased size */}
          </div>
          <h2 className="text-2xl font-bold text-white">Portfolio Overview</h2>
          <p className="text-md text-[#b5b9bf] mt-3">
          View the distribution of your holdings with real-time data.
          </p>
        </div>

        {/* Approval Feature Card */}
        <div
          className="bg-[#07152f] p-8 rounded-2xl shadow-xl  
          hover:scale-105 hover:shadow-lg hover:shadow-white transition-all duration-300 cursor-pointer text-center w-80 
          border-2 border-[#eaf2f9] flex flex-col items-center"
          onClick={() => navigate("/features/approval")}
        >
          <div className="bg-[#0A1F35] p-3 rounded-full shadow-md mb-4 border border-[#6EACDA]">
            <ShieldCheck size={50} className="text-[#6EACDA]" /> {/* Increased size */}
          </div>
          <h2 className="text-2xl font-bold text-white">Approval</h2>
          <p className="text-md text-[#b3b8bd] mt-3">
            Approve transactions securely with real-time verification.
          </p>
        </div>

      </div>
    </div>
    </div>
  );
};

export default Features;
