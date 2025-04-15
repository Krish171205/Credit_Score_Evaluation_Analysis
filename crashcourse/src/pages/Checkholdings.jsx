// import {
//   ArrowLeft,
//   User,
//   Landmark,
//   CreditCard,
//   Banknote,
//   Activity,
//   BarChart,
//   PieChart,
//   Users,
//   Clock,
//   Percent,
//   Wallet,
//   GraduationCap,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import { useEffect, useState } from "react";

// const iconMap = {
//   Age: <User size={28} />,
//   Education: <GraduationCap size={28} />,
//   AnnualIncome: <Banknote size={28} />,
//   Dependants: <Users size={28} />,
//   NumberOfLoans: <Landmark size={28} />,
//   CreditCards: <CreditCard size={28} />,
//   PaymentHistory: <Clock size={28} />,
//   CreditUtilization: <Percent size={28} />,
//   CreditMix: <BarChart size={28} />,
//   AccountBalance: <Wallet size={28} />,
// };

// const formatTitle = (key) =>
//   key
//     .replace(/([A-Z])/g, " $1")
//     .replace(/^./, (str) => str.toUpperCase())
//     .trim();

// const formatValue = (key, value) => {
//   if (typeof value === "number" && key.toLowerCase().includes("income"))
//     return `$${value.toLocaleString()}`;
//   if (typeof value === "number" && key.toLowerCase().includes("balance"))
//     return `$${value.toLocaleString()}`;
//   if (typeof value === "number" && key.toLowerCase().includes("history"))
//     return `${value.toFixed(2)}%`;
//   if (typeof value === "number" && key.toLowerCase().includes("utilization"))
//     return `${value.toFixed(2)}%`;
//   if (typeof value === "number" && key.toLowerCase().includes("mix"))
//     return `${value.toFixed(2)}%`;
//   return value;
// };

// const Card = ({ icon, title, value }) => (
//   <div className="bg-[#07152f] p-6 rounded-xl flex flex-col items-start gap-2 shadow-md border border-[#0ee7f6] hover:scale-105 hover:shadow-[0_0_25px_#0ee7f6] transition duration-300 min-w-[150px]">
//     <div className="text-[#0ee7f6]">{icon}</div>
//     <div className="text-md text-white">{title}</div>
//     <div className="text-xl font-bold text-white">{value}</div>
//   </div>
// );

// // Dummy default data to show UI without backend
// const defaultUserData = {
//   Age: 46,
//   AnnualIncome: 884160,
//   Education: "Graduate",
//   Dependants: 4,
//   NumberOfLoans: 1,
//   CreditCards: 2,
//   PaymentHistory: 92.72,
//   CreditUtilization: 36.04,
//   CreditMix: 63.54,
//   AccountBalance: 131412,
// };

// const Checkholdings = () => {
//   const navigate = useNavigate();
//   const [userData, setUserData] = useState(defaultUserData); // Default data
//   const [loading, setLoading] = useState(false); // Not loading by default

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           console.warn("No token found");
//           return;
//         }

//         setLoading(true);

//         const res = await fetch("http://localhost:5000/api/user/details", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!res.ok) throw new Error("Failed to fetch data");

//         const data = await res.json();
//         setUserData(data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#010A1A] text-white">
//       <Navbar />

//       <button
//         onClick={() => navigate(-1)}
//         className="flex items-center gap-2 text-[#0ee7f6] hover:underline mt-6"
//       >
//         <ArrowLeft size={18} /> Back
//       </button>

//       <h1 className="text-3xl font-bold mt-8 mb-6 text-[#0ee7f6]">
//         Portfolio Overview
//       </h1>

//       {loading ? (
//         <p className="text-gray-400">Loading your data...</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {Object.entries(userData).map(([key, value]) => (
//             <Card
//               key={key}
//               icon={iconMap[key] || <PieChart size={28} />}
//               title={formatTitle(key)}
//               value={formatValue(key, value)}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Checkholdings;
import {
  ArrowLeft,
  User,
  Landmark,
  CreditCard,
  Banknote,
  BarChart,
  PieChart,
  Users,
  Clock,
  Percent,
  Wallet,
  GraduationCap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

// Map for icons based on data keys
const iconMap = {
  Age: <User size={28} />,
  Education: <GraduationCap size={28} />,
  AnnualIncome: <Banknote size={28} />,
  Dependants: <Users size={28} />,
  NumberOfLoans: <Landmark size={28} />,
  CreditCards: <CreditCard size={28} />,
  PaymentHistory: <Clock size={28} />,
  CreditUtilization: <Percent size={28} />,
  CreditMix: <BarChart size={28} />,
  AccountBalance: <Wallet size={28} />,
};

// Format keys like "AnnualIncome" to "Annual Income"
const formatTitle = (key) =>
  key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();

// Format values based on key
const formatValue = (key, value) => {
  const formatINR = (num) =>
    `₹${num.toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    })}`;

  if (typeof value === "number" && key.toLowerCase().includes("income"))
    return formatINR(value);
  if (typeof value === "number" && key.toLowerCase().includes("balance"))
    return formatINR(value);
  if (typeof value === "number" && key.toLowerCase().includes("history"))
    return `${value.toFixed(2)}%`;
  if (typeof value === "number" && key.toLowerCase().includes("utilization"))
    return `${value.toFixed(2)}%`;
  if (typeof value === "number" && key.toLowerCase().includes("mix"))
    return `${value.toFixed(2)}%`;
  return value;
};


// Card component to display each field
const Card = ({ icon, title, value }) => (
  <div className="bg-[#07152f] p-6 rounded-xl flex flex-col items-start gap-2 shadow-md border border-[#0ee7f6] hover:scale-105 hover:shadow-[0_0_25px_#0ee7f6] transition duration-300 min-w-[180px]">
    <div className="text-[#0ee7f6]">{icon}</div>
    <div className="text-md text-white">{title}</div>
    <div className="text-xl font-bold text-white">{value}</div>
  </div>
);

// Dummy default data to show UI before backend loads
const defaultUserData = {
  Age: 46,
  AnnualIncome: 884160,
  Education: "Graduate",
  Dependants: 4,
  NumberOfLoans: 1,
  CreditCards: 2,
  PaymentHistory: 92.72,
  CreditUtilization: 36.04,
  CreditMix: 63.54,
  AccountBalance: 131412,
};

const Checkholdings = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(defaultUserData); // use default
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("No token found");
          return;
        }

        setLoading(true);

        const res = await fetch("http://localhost:5000/api/user/details", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch data");

        const data = await res.json();
        setUserData(data); // override dummy data
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // return (
  //   <div className="min-h-screen bg-[#010A1A] text-white">
  //     <Navbar />

  //     <button
  //       onClick={() => navigate(-1)}
  //       className="flex items-center gap-2 text-[#0ee7f6] hover:underline mt-6"
  //     >
  //       <ArrowLeft size={18} /> Back
  //     </button>

  //     <h1 className="text-3xl font-bold mt-8 mb-6 text-[#0ee7f6]">
  //       Portfolio Overview
  //     </h1>

  //     {loading ? (
  //       <p className="text-gray-400">Loading your data...</p>
  //     ) : (
  //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  //         {Object.entries(userData).map(([key, value]) => (
  //           <Card
  //             key={key}
  //             icon={iconMap[key] || <PieChart size={28} />}
  //             title={formatTitle(key)}
  //             value={formatValue(key, value)}
  //           />
  //         ))}
  //       </div>
  //     )}
  //   </div>
  // );
  return (
    <div className="min-h-screen bg-[#010A1A] text-white ">
      <Navbar />
     <div className=" sm:px-6 md:px-10">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[#0ee7f6] hover:underline mt-6"
      >
        <ArrowLeft size={18} /> Back
      </button>
  
      <h1 className="text-3xl font-bold mt-8 mb-6 text-[#0ee7f6]">
        Portfolio Overview
      </h1>
  
      {loading ? (
        <p className="text-gray-400">Loading your data...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {Object.entries(userData).map(([key, value]) => (
            <Card
              key={key}
              icon={iconMap[key] || <PieChart size={28} />}
              title={formatTitle(key)}
              value={formatValue(key, value)}
            />
          ))}
        </div>
      )}
      </div>
    </div>
  );
  
};

export default Checkholdings;

