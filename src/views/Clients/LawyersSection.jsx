import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const LawyersSection = forwardRef(({ showCards, lawyers }, ref) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 641px) and (max-width: 1024px)' });
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);

  const nextCard = () => {
    setCurrentIndex((prev) => (prev === lawyers.length - 1 ? 0 : prev + 1));
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev === 0 ? lawyers.length - 1 : prev - 1));
  };
 // Card size configuration
 const getCardSize = () => {
  if (isMobile) return { width: '90vw', height: '300px' }; // Full-width cards on mobile
  if (isTablet) return { width: '45vw', height: '350px' }; // Two cards side-by-side on tablet
  return { width: '200px', height: '260px' }; // Default desktop size
};

const cardSize = getCardSize();
  return (
    <section
      ref={ref}
      id="lawyers-section"
      className="relative flex flex-col items-center min-h-screen bg-gray-100 pt-3 pb-10"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 md:mb-9 text-center w-full px-4">Meet Our Lawyers</h2>
      
      {/* Mobile Carousel View */}
      {showCards && isMobile && (
        <div className="relative w-full max-w-md mx-auto">
          {/* Left Navigation Arrow */}
          <button 
            onClick={prevCard}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md"
          >
            <FaChevronLeft className="text-gray-700 text-xl" />
          </button>
          
          {/* Carousel Container */}
          <div className="overflow-hidden w-full">
            <div 
              className="flex transition-transform duration-300"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              ref={scrollRef}
            >
              {lawyers.map((lawyer) => (
                <div 
                  key={lawyer.id}
                  className="flex-shrink-0 w-full px-4"
                >
                  <div className="w-full h-[300px] rounded-xl shadow-lg overflow-hidden bg-white relative mx-auto"
                                      style={{ height: cardSize.height }} // Using dynamic height
                  >
                    {/* Mobile-specific image container showing only upper portion */}
                    <div className="w-full h-full overflow-hidden">
                      <img
                        src={lawyer.image}
                        alt={`Lawyer ${lawyer.id}`}
                        className="w-full h-full object-cover object-top" // object-top focuses on top of image
                        style={{ 
                          objectPosition: 'top', 
                          height: '150%' // Extends beyond container to show top portion
                        }}
                      />
                    </div>
                    <div className="absolute bottom-0 bg-black bg-opacity-60 text-white p-4 w-full text-center">
                      <p className="text-lg font-bold">{lawyer.name}</p>
                      <p className="text-sm">{lawyer.specialization}</p>
                      <p className="text-sm font-semibold">{lawyer.fee}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Navigation Arrow */}
          <button 
            onClick={nextCard}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md"
          >
            <FaChevronRight className="text-gray-700 text-xl" />
          </button>
          
          {/* Indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {lawyers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full ${currentIndex === index ? 'bg-blue-600' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
      )}
      {/* Tablet View (grid with 2 cards) - Fixed: Added proper conditional rendering */}
      {showCards && isTablet && (
        <div className="w-full px-4 max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-6">
            {lawyers.map((lawyer) => (
              <div 
                key={lawyer.id}
                className="rounded-xl shadow-lg overflow-hidden bg-white relative"
                style={{ width: cardSize.width, height: cardSize.height }}
              >
                <img
                  src={lawyer.image}
                  alt={`Lawyer ${lawyer.id}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 bg-black bg-opacity-60 text-white p-3 w-full text-center">
                  <p className="text-md font-bold">{lawyer.name}</p>
                  <p className="text-sm">{lawyer.specialization}</p>
                  <p className="text-sm font-semibold">{lawyer.fee}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Desktop Grid View - Fixed: Added !isTablet condition to prevent overlap */}
      {showCards && !isMobile && !isTablet && (
        <div className="flex flex-wrap justify-center gap-6 w-full px-4 max-w-6xl mx-auto">
          {lawyers.map((lawyer) => (
            <div 
              key={lawyer.id}
              className="rounded-xl shadow-lg overflow-hidden bg-white relative"
              style={{ width: cardSize.width, height: cardSize.height }} // Using dynamic sizing
            >
              <img
                src={lawyer.image}
                alt={`Lawyer ${lawyer.id}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 bg-black bg-opacity-60 text-white p-3 w-full text-center">
                <p className="text-sm font-bold">{lawyer.name}</p>
                <p className="text-xs">{lawyer.specialization}</p>
                <p className="text-xs font-semibold">{lawyer.fee}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View All Button */}
      <div className="mt-auto">
        <button
          onClick={() => navigate("/lawyers")}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all"
        >
          View All Lawyers
        </button>
      </div>
    </section>
  );
});

export default LawyersSection;