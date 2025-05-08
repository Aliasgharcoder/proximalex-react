import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  { 
    name: "John Doe", 
    role: "Business Owner",
    text: "Proxima Lex helped me win my case effortlessly. Their expertise made the complex legal process simple and stress-free.",
    rating: 5
  },
  { 
    name: "Jane Smith", 
    role: "Entrepreneur",
    text: "Professional and trustworthy legal services! They exceeded all my expectations with their attention to detail.",
    rating: 5
  },
  { 
    name: "Michael Johnson", 
    role: "Corporate Executive",
    text: "The team at Proxima Lex provided exceptional counsel during our merger. Their strategic approach saved us millions.",
    rating: 5
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Elegant Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-serif font-bold text-gray-800 mb-3">
            Client <span className="text-blue-700">Testimonials</span>
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear what our valued clients say about their experience with our legal services
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -10 }}
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-full h-2 bg-blue-600"></div>
              <div className="absolute top-8 right-8 text-blue-100 text-7xl">
                <FaQuoteLeft />
              </div>

              {/* Content */}
              <div className="p-8 pt-12">
                {/* Rating Stars */}
                <div className="flex mb-4 text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-gray-700 italic mb-6 text-lg leading-relaxed">
                  "{testimonial.text}"
                </p>

                <div className="border-t border-gray-100 pt-4">
                  <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;