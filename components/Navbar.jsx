import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  return (
    <>
      <nav className="bg-gray-900 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          
          <div className="text-xl font-bold text-blue-500">
            <Link to="/">MyCollege</Link>
          </div>

          <div className="hidden md:flex space-x-6">
            <Link
              className="hover:text-blue-400 transition duration-300"
              to="/"
            >
              Home
            </Link>
            <Link
              className="hover:text-blue-400 transition duration-300"
              to="/about"
            >
              About
            </Link>
            <Link
              className="hover:text-blue-400 transition duration-300"
              to="/contact"
            >
              Contact Us
            </Link>
            <Link
              className="hover:text-blue-400 transition duration-300"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="hover:text-blue-400 transition duration-300"
              to="/register"
            >
              Register
            </Link>
          </div>

        
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
              aria-label="Toggle Menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
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

        
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800 text-white p-4 space-y-4">
            <Link
              className="block hover:text-blue-400 transition duration-300"
              to="/"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              className="block hover:text-blue-400 transition duration-300"
              to="/about"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              className="block hover:text-blue-400 transition duration-300"
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
            <Link
              className="block hover:text-blue-400 transition duration-300"
              to="/login"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              className="block hover:text-blue-400 transition duration-300"
              to="/register"
              onClick={() => setIsMenuOpen(false)}
            >
              Register
            </Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
