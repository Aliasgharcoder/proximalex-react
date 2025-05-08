import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LawyersSection from "./LawyersSection"; // Import LawyersSection
import { useMediaQuery } from "react-responsive";

import lawyer1 from "../../assets/images/HeroSection/Lawyer1.jpeg";
import lawyer2 from "../../assets/images/HeroSection/Lawyer2.jpeg";
import lawyer3 from "../../assets/images/HeroSection/Lawyer3.jpg";
import lawyer4 from "../../assets/images/HeroSection/Lawyer4.jpg";
import lawyer5 from "../../assets/images/HeroSection/Lawyer5.jpg";

const lawyers = [
  { id: 1, image: lawyer1, name: "John Doe", fee: "$300/hr", specialization: "Criminal Law" },
  { id: 2, image: lawyer2, name: "Jane Smith", fee: "$250/hr", specialization: "Family Law" },
  { id: 3, image: lawyer3, name: "Robert Brown", fee: "$200/hr", specialization: "Corporate Law" },
  { id: 4, image: lawyer4, name: "Emily Johnson", fee: "$280/hr", specialization: "Real Estate Law" },
  { id: 5, image: lawyer5, name: "Michael Davis", fee: "$350/hr", specialization: "Intellectual Property" },
];


const HeroSection = () => {
  const [unfold, setUnfold] = useState(false);
  const [inLawyersSection, setInLawyersSection] = useState(false);
  const sectionRef = useRef(null);
  const lawyersRef = useRef(null);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end 0.5"],
  });

  useEffect(() => {
    setTimeout(() => setUnfold(true), 700); // Start animation after 0.6s
  }, []);
// Detect when scroll enters the Lawyers Section
useEffect(() => {
  const handleScroll = () => {
    if (lawyersRef.current) {
      const rect = lawyersRef.current.getBoundingClientRect();
      setInLawyersSection(rect.top < window.innerHeight * 0.7);
    }
  };
    // Add debounce to improve performance
    let ticking = false;
    const debouncedScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", debouncedScroll);
    return () => window.removeEventListener("scroll", debouncedScroll);
  }, []);
  // Move the cards down as we scroll
  const cardY =  isMobile ? useTransform(scrollYProgress, [0, 1], ["0%", "0%"]) : 
  useTransform(scrollYProgress, [0, 1], ["0%", "80vh"],{clamp: false}); // Moves cards down
  const cardScale = isMobile ? useTransform(scrollYProgress, [0, 1], [1, 0.55]) : 
  useTransform(scrollYProgress, [0, 1], [1, 0.95]); // Keeps size constant
  const cardOpacity = isMobile ? useTransform(scrollYProgress, [0.8, 1], [1, 1]) : 
  useTransform(scrollYProgress, [0.8, 1], [1, 1]); // Ensure cards remain visible

  return (
    <>
      <section
        ref={sectionRef}
        id="hero-section"
        className="relative flex flex-col items-center justify-center h-screen bg-gray-100 overflow-visible"
      >
        {/* Heading */}
        <div className="text-center max-w-4xl px-4">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-3 mt-1 md:mt-3"
        >
          Welcome to Proxima Lex
        </motion.h1>
        <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg md:text-xl text-gray-600 mb-4 md:mb-3"
          >
            Connecting you with top legal professionals for all your legal needs
          </motion.p>
      </div>

        {/* Card Container */}
        {!isMobile && (
        <motion.div
          style={{ y: cardY, scale: cardScale, opacity: cardOpacity }}
          className="relative mb-9 flex items-center justify-center w-full h-[400px] z-[40]"
        >
          {lawyers.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                unfold
                  ? inLawyersSection
                  ?{
                    x: (image.id - 3) * 250, // Row layout
                    y: 0, // No vertical shift
                    opacity: 1,
                    scale: 1,
                    rotate: 0, // No rotation
                    }
                  : {
                    x: (image.id - 3) * 190, // Curved outward
                    y: Math.abs(image.id - 3) * 20,
                    opacity: 1,
                    scale: 1,
                    rotate: (image.id - 3) * 8,
                  }
                  :{}
              }
              transition={{
                duration: 1.2,
                ease: [0.17, 0.67, 0.83, 0.67], // Custom easing for smoother animation
                delay: image.id * 0.2,
              }}
              className="absolute w-[140px] h-[180px] sm:w-[160px] sm:h-[220px] md:w-[200px] md:h-[260px] rounded-xl shadow-lg overflow-hidden bg-white"
            >
              <img
                src={image.image}
                alt={`Lawyer ${image.id}`}
                className="w-full h-full object-cover"
              />{/* Lawyer Details (Only Show in Lawyers Section) */}
              {inLawyersSection && (
                <div className="absolute bottom-0 bg-black bg-opacity-60 text-white p-2 w-full text-center">
                  <p className="text-sm font-bold">{image.name}</p>
                  <p className="text-xs">{image.specialization}</p>
                  <p className="text-xs font-semibold">{image.fee}</p>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
        )}

        {/* Down Arrow Scroll Indicator */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, 10, 0] }} // Bouncing effect
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 flex flex-col items-center cursor-pointer"
          onClick={() => {
            const nextSection = document.getElementById("lawyers-section");
            nextSection?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <p className="text-gray-600 text-sm">Scroll Down</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-7 text-gray-800 mt-1 animate-bounce"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </section>
      <LawyersSection ref={lawyersRef} showCards={isMobile} lawyers={lawyers} />
    </>
  );
};

export default HeroSection;
