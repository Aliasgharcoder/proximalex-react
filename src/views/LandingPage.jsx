// LandingPage.jsx
import { useState,useEffect } from "react";
import Navbar from "./Clients/Navbar";
import HeroSection from "./Clients/HeroSection";
import FeaturedSection from "./Clients/ServicesPage";
import Footer from "./Clients/Footer";
import Testimonials from "./Clients/Testimonials";
// import LawyersSection from "./Clients/LawyersSection";
import FAQ from "./Clients/FAQ";
import ContactUs from "./Clients/ContactUs";
const LandingPage = () => {
  return (
    <div className="bg-gray-100 text-gray-900 ">
      <Navbar />
      <HeroSection  />
      {/* <LawyersSection /> */}
      <FeaturedSection />
      <Testimonials />
      <FAQ />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default LandingPage;
