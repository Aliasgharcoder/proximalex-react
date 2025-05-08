import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AuthLayout from "./AuthLayout";
import signupImage from "../../assets/images/Signup-Image.png";
import { register as registerUser } from "../../services/authService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Validation schema
const schema = yup.object().shape({
  name: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  confirmPassword: yup.string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
  role: yup.string().required("Role is required"),
  terms: yup.boolean().oneOf([true], "You must accept the terms and conditions"),
});

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // In your Signup component's onSubmit
const onSubmit = async (data) => {
  setIsLoading(true);
  try {
    const { confirmPassword, terms, ...userData } = data;
    const payload = {
      email: userData.email,
      username: userData.name,       // assuming "name" is meant to be the username
      password: userData.password,
      password2: userData.password,  // because your backend expects password2
      role: userData.role,
    };
    console.log("Sending data to register:", payload);
    await registerUser(payload);
    toast.success("Registration successful! Redirecting...");
    setTimeout(() => navigate("/login"), 3000); // Redirect after delay
  } catch (error) {
    toast.error(error.message || "Registration failed. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <AuthLayout image={signupImage}>
      <ToastContainer position="top-right" autoClose={5000} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md mx-auto"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Create an account</h2>
          <p className="text-gray-400">Get started with your free account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              className={`w-full px-4 py-3 bg-gray-800 border ${errors.name ? "border-red-500" : "border-gray-700"} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500`}
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className={`w-full px-4 py-3 bg-gray-800 border ${errors.email ? "border-red-500" : "border-gray-700"} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500`}
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className={`w-full px-4 py-3 bg-gray-800 border ${errors.password ? "border-red-500" : "border-gray-700"} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500`}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
              Confirm Password
            </label>
            <input
            disabled={isLoading}
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
              className={`w-full px-4 py-3 bg-gray-800 border ${errors.confirmPassword ? "border-red-500" : "border-gray-700"} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500`}
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-1">
              I am a
            </label>
            <select
              id="role"
              {...register("role")}
              className={`w-full px-4 py-3 bg-gray-800 border ${errors.role ? "border-red-500" : "border-gray-700"} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500`}
            >
              <option value="client">Client</option>
              <option value="lawyer">Lawyer</option>
            </select>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                {...register("terms")}
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-600 rounded bg-gray-800"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="font-medium text-gray-300">
                I agree to the{" "}
                <a href="#" className="text-orange-500 hover:text-orange-400">
                  Terms and Conditions
                </a>
              </label>
              {errors.terms && (
                <p className="mt-1 text-sm text-red-500">{errors.terms.message}</p>
              )}
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200 mt-4"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-orange-500 hover:text-orange-400">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </AuthLayout>
  );
};

export default Signup;