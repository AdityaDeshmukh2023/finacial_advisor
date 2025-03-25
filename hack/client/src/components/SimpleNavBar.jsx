import React from "react";
import { Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SimpleNavBar = ({ language, toggleLanguage }) => {
  const navigate = useNavigate();

  // Ensure language is defined before using it
  const lang = language ? language.toUpperCase() : "EN";

  return (
    <nav className="fixed top-0 w-full bg-[#1E3A8A] text-white z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="ml-2 text-xl font-bold">FinAdvise</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 bg-[#3B82F6] text-white font-semibold rounded-lg hover:bg-[#2563EB] transition-colors"
            >
              Login
            </button>
            <button
              onClick={toggleLanguage}
              className="flex items-center hover:text-[#3B82F6] transition-colors"
            >
              <Globe className="h-4 w-4 mr-1" />
              {lang}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SimpleNavBar;
