import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I register as a client?",
    answer: "To register, click on the 'Signup' button, fill in your details, and select 'Client' as your role. Our onboarding process takes less than 5 minutes and you'll gain immediate access to our legal network.",
  },
  {
    question: "How can I find the right lawyer for my case?",
    answer: "Our advanced matching system helps you find the perfect legal professional. Browse by specialty, experience level, or success rate. Each lawyer's profile includes client reviews, case history, and credentials.",
  },
  {
    question: "Is my personal and legal information secure?",
    answer: "We employ military-grade 256-bit encryption, regular security audits, and comply with all data protection regulations. Your confidentiality is our top priority, protected by attorney-client privilege where applicable.",
  },
  {
    question: "What are your consultation fees?",
    answer: "We offer flexible pricing including free initial consultations, fixed fees for standard services, and hourly rates for complex matters. All pricing is transparent and agreed upon before engagement.",
  },
  {
    question: "How do virtual consultations work?",
    answer: "Our secure video platform allows you to meet with attorneys from anywhere. Sessions are encrypted, confidential, and can be scheduled 24/7 for urgent matters. All documents can be shared and signed electronically.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Elegant Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-sm font-medium text-orange-500 bg-orange-500/10 rounded-full mb-4">
            Common Questions
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked <span className="text-orange-400">Questions</span>
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to know about our legal services and how we can assist you.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`flex justify-between items-center w-full p-6 text-left rounded-xl transition-all duration-300 ${
                  openIndex === index
                    ? "bg-gray-700 shadow-lg"
                    : "bg-gray-800 hover:bg-gray-700 shadow-md"
                }`}
              >
                <span className="text-lg font-medium text-white">
                  {faq.question}
                </span>
                <motion.div
                  animate={{
                    rotate: openIndex === index ? 180 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="text-orange-400" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6"
                  >
                    <div className="py-4 text-gray-300 border-l-2 border-orange-500 pl-4">
                      {faq.answer}
                      {index === 0 && (
                        <button className="mt-3 inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                          Get Started Now
                          <svg
                            className="ml-2 w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            ></path>
                          </svg>
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-xl text-gray-300 mb-6">
            Still have questions? We're here to help.
          </p>
          <button className="px-8 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl">
            Contact Our Support Team
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;