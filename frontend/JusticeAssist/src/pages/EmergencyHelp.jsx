import React from "react";
import { FaPhoneAlt, FaExclamationTriangle } from "react-icons/fa";

const EmergencyHelp = () => {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="bg-black/40 border border-red-500 rounded-xl shadow-[0_0_20px_rgba(255,0,0,0.4)] p-6 w-[90%] md:w-[70%] text-center">
        
        {/* Header */}
        <div className="flex items-center justify-center gap-2 text-red-500 font-bold text-xl mb-4">
          <FaExclamationTriangle className="text-2xl" />
          <span>Need Immediate Help?</span>
        </div>

        <p className="text-gray-300 mb-6">
          If you're experiencing an active cyber attack or emergency, contact these numbers immediately:
        </p>

        {/* Emergency Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-red-500 text-white rounded-lg py-6 flex flex-col items-center shadow-lg">
            <FaPhoneAlt className="text-2xl mb-2" />
            <h2 className="text-2xl font-bold">1930</h2>
            <p className="text-sm">Cybercrime Helpline</p>
          </div>

          <div className="bg-red-500 text-white rounded-lg py-6 flex flex-col items-center shadow-lg">
            <FaPhoneAlt className="text-2xl mb-2" />
            <h2 className="text-2xl font-bold">1091</h2>
            <p className="text-sm">Women Helpline</p>
          </div>

          <div className="bg-red-500 text-white rounded-lg py-6 flex flex-col items-center shadow-lg">
            <FaPhoneAlt className="text-2xl mb-2" />
            <h2 className="text-2xl font-bold">112</h2>
            <p className="text-sm">National Emergency</p>
          </div>
        </div>

        {/* Report Online Button */}
        <a
          href="https://cybercrime.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-transparent border border-red-500 text-red-500 px-6 py-3 rounded-lg hover:bg-red-500 hover:text-white transition"
        >
          <FaExclamationTriangle />
          Report Online at cybercrime.gov.in
        </a>
      </div>
    </div>
  );
};

export default EmergencyHelp;
