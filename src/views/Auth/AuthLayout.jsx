import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AuthLayout = ({ children, image }) => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col lg:flex-row">
      {/* Left Section - Form */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-20 py-12"
      >
        {children}
      </motion.div>

      {/* Right Section - Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.7, ease: "easeIn" }}
        className="hidden lg:block w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
        <div className="relative z-10 h-full flex items-end p-12">
          <div>
            <div className="flex items-center mb-4">
              <svg className="h-10 w-10 text-orange-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L3 9V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V9L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="ml-2 text-3xl font-bold text-white">Proxima Lex</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Connecting Justice</h2>
            <p className="text-gray-300 text-lg">
              Streamline your legal practice or find the perfect lawyer for your needs.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;