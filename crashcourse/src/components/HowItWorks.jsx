// import React from "react";

// function HowItWorks() {
//   return (
//     <div className="bg-[#6EACDA] py-16">
//       <h2 className="text-4xl font-bold text-center text-[#191d26] mb-8">How It Works</h2>

//       <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center px-6">
//         {/* Step 1 - Sign Up */}
//         <div className="flex flex-col items-center">
//           <span className="bg-blue-500 text-white text-lg font-bold px-3 py-1 rounded-full">1</span>
//           <h3 className="text-xl font-bold text-[#080d1a] mt-2">Sign Up</h3>
//           <p className="mt-2 text-gray-700">Create an account and enter your details.</p>
//         </div>

//         {/* Step 2 - Get Your Score */}
//         <div className="flex flex-col items-center">
//           <span className="bg-blue-500 text-white text-lg font-bold px-3 py-1 rounded-full">2</span>
//           <h3 className="text-xl font-bold text-[#11224D] mt-2">Get Your Score</h3>
//           <p className="mt-2 text-gray-700">Our AI calculates your credit score instantly.</p>
//         </div>

//         {/* Step 3 - Improve & Apply */}
//         <div className="flex flex-col items-center">
//           <span className="bg-blue-500 text-white text-lg font-bold px-3 py-1 rounded-full">3</span>
//           <h3 className="text-xl font-bold text-[#11224D] mt-2">Improve & Apply</h3>
//           <p className="mt-2 text-gray-700">Follow our suggestions and apply for loans easily.</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HowItWorks;

import React from "react";

function HowItWorks() {
  return (
    <div className="bg-gradient-to-t  from-[#435a77] to-[#1b2038] py-16">

     <h2 className="text-4xl  font-bold text-center py-1 text-[#f7f7fa] mb-8 font-weight:1000">How It Works</h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center px-6">
        {/* Step 1 - Sign Up */}
        <div className="flex flex-col items-center py-2">
          <span className="bg-[#c1dfe5] text-black text-lg font-bold px-4 py-2 rounded-md shadow-md shadow-[#64a9bc]">
            1
          </span>
          <h3 className="text-xl font-bold text-white mt-2 font-weight:900">Sign Up</h3>
          <p className="mt-2 text-gray-300">Create an account and enter your details.</p>
        </div>

        {/* Step 2 - Get Your Score */}
        <div className="flex flex-col items-center">
          <span className="bg-[#c1dfe5] text-black text-lg font-bold px-4 py-2 rounded-md shadow-md shadow-[#64a9bc]">
            2
          </span>
          <h3 className="text-xl font-bold text-white mt-2">Get Your Score</h3>
          <p className="mt-2 text-gray-300">Our AI calculates your credit score instantly.</p>
        </div>

        {/* Step 3 - Improve & Apply */}
        <div className="flex flex-col items-center">
          <span className="bg-[#c1dfe5] text-black text-lg font-bold px-4 py-2 rounded-md shadow-md shadow-[#64a9bc]">
            3
          </span>
          <h3 className="text-xl font-bold text-white mt-2">Improve & Apply</h3>
          <p className="mt-2 text-gray-300">Follow our suggestions and apply for loans easily.</p>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;

