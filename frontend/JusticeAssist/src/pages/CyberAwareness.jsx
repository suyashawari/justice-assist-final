// src/pages/Awareness.jsx
import React, { useState } from "react";
import Heatmap from "../components/Heatmap"; 
import Quiz from "../pages/Quiz";
import CyberLaws from "../components/CyberLaws";
import CyberBlogs from "../components/CyberBlogs";
import "./CyberAwareness.css"; 

const Awareness = () => {
  const [activeTab, setActiveTab] = useState("heatmap");

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      {/* --- Tabs Navigation --- */}
      <div className="flex justify-center border-b border-gray-200 mb-8 gap-2">
        {["heatmap", "quizzes", "blogs", "laws"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
          >
            {tab === "laws" ? "Cyber Laws" : tab}
          </button>
        ))}
      </div>

      {/* --- Content Area --- */}
      <div className="container mx-auto px-6">
        {activeTab === "heatmap" && (
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <Heatmap />
          </div>
        )}

        {activeTab === "quizzes" && (
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4">Cyber Awareness Quiz</h2>
            <p className="text-gray-600 mb-6">
              Test your knowledge about cybercrime and safe internet practices.
            </p>
            <Quiz />
          </div>
        )}

        {activeTab === "blogs" && <CyberBlogs />}

        {activeTab === "laws" && (
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <CyberLaws />
          </div>
        )}
      </div>
    </div>
  );
};

export default Awareness;
