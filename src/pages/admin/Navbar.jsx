import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { app } from "../../firebase/Firebase";
import { Link } from "react-router-dom";
// import logo from "../../assets/Blue and Red Illustrative Cricket Club Sports Logo-2.png";
import logo from "../../assets/logo.png";

const auth = getAuth(app);

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="bg-black">
      <div className="flex items-center justify-between h-16 px-8">
        <div className="flex items-center">
          <Link to="/" className="flex items-center flex-shrink-0">
            <img src={logo} className="w-20" alt="Logo" />
            <span className="text-white text-xl font-bold">Stump Stat</span>
          </Link>
        </div>
        <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-4">
            <Link
              to="/"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/about_us"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              About Us
            </Link>
            <Link
              to="/all-match-card"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              All Matches
            </Link>
            <Link
              to="/all_news_articles"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Cricket Articles
            </Link>
            
            <Link
              to="/statistics"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Statistical Articles
            </Link>
            <Link
              to="/contact-us"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Contact Us
            </Link>
          </div>
        </div>
        <div className="md:hidden flex items-center">
          <button
            type="button"
            onClick={toggleMenu}
            className="hamburger inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white"
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className={`block h-6 w-6 transform transition-transform ${
                menuOpen ? "rotate-90" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          menuOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            onClick={closeMenu} // Close menu on click
          >
            Home
          </Link>
          <Link
            to="/all-match-card"
            className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            onClick={closeMenu} // Close menu on click
          >
            All Matches
          </Link>
          <Link
            to="/all_news_articles"
            className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            onClick={closeMenu} // Close menu on click
          >
            Cricket Articles
          </Link>
          
          <Link
            to="/statistics"
            className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            onClick={closeMenu} // Close menu on click
          >
            Statistical Articles
          </Link>
          <Link
            to="/about_us"
            className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            onClick={closeMenu} // Close menu on click
          >
            About Us
          </Link>
          <Link
            to="/contact-us"
            className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            onClick={closeMenu} // Close menu on click
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
