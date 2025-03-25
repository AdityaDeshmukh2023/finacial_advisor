import React, { useState } from "react";
import { Menu, X, Globe, BadgeDollarSign } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const NavBar = ({ language, toggleLanguage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLoginCLick =() =>{
    <Navigate to="/login" />
  }

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <BadgeDollarSign className="h-8 w-8 text-green-600" />
            <span className="ml-2 text-xl font-bold text-green-800">
              FinAdvise
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/"
              className="text-green-800 hover:text-green-600 transition-colors"
            >
              Home
            </a>
            <a
              href="/ppf"
              className="text-green-800 hover:text-green-600 transition-colors"
            >
              PPF
            </a>
            <a
              href="/schemes"
              className="text-green-800 hover:text-green-600 transition-colors"
            >
              Scheme
            </a>
            <a
              href="/News"
              className="text-green-800 hover:text-green-600 transition-colors"
            >
              News
            </a>
            <a
              href="/road"
              className="text-green-800 hover:text-green-600 transition-colors"
            >
              Learning Roadmap
            </a>
             {/* Show Sign In Button if not signed in */}
           <SignedOut>
           <a
              href="/login"
              className="text-green-800 hover:text-green-600 transition-colors"
            >
              Login   
            </a>
            </SignedOut>

            <button
              onClick={toggleLanguage}
              className="flex items-center text-green-800 hover:text-green-600 transition-colors"
            >
              <Globe className="h-4 w-4 mr-1" />
              {language.toUpperCase()}
            </button>
            
             {/* Show User Profile Button if signed in */}
           <SignedIn>
             <UserButton />
           </SignedIn>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-green-800"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-green-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#"
              className="block px-3 py-2 text-green-800 hover:bg-green-50 rounded-md"
            >
              Home
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-green-800 hover:bg-green-50 rounded-md"
            >
              Features
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-green-800 hover:bg-green-50 rounded-md"
            >
              Community
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-green-800 hover:bg-green-50 rounded-md"
            >
              Learning
            </a>
            <button
              onClick={toggleLanguage}
              className="flex items-center px-3 py-2 text-green-800 hover:bg-green-50 rounded-md w-full"
            >
              <Globe className="h-4 w-4 mr-1" />
              {language.toUpperCase()}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
