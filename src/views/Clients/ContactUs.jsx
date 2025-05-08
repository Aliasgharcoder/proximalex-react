import { motion } from "framer-motion";
import {
  FiSend,
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
} from "react-icons/fi";
import { useRef } from "react";

const ContactUs = () => {
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can implement API or email service here
    formRef.current.reset();
    // Add a confirmation animation or toast here
  };

  return (
    <section
     id="contact-section"
     className="relative py-20 px-6 md:px-10 bg-gray-900 overflow-hidden">
      {/* Futuristic background particles */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-1 h-full bg-blue-400 animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-2 h-2 rounded-full bg-purple-500 animate-ping"></div>
        <div className="absolute bottom-20 left-20 w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
            Contact Us
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Engage with our legal team through secure channels.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gray-800 bg-opacity-50 backdrop-blur-lg p-8 rounded-xl border border-gray-700 shadow-xl"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="w-3 h-3 rounded-full bg-cyan-400 mr-3 animate-pulse"></span>
              Message Command Panel
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-cyan-300 text-sm font-medium mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-900 bg-opacity-70 border border-gray-700 rounded-lg p-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                  placeholder="Name"
                  required
                />
              </div>

              <div>
                <label className="block text-cyan-300 text-sm font-medium mb-1">
                  Email Link
                </label>
                <input
                  type="email"
                  className="w-full bg-gray-900 bg-opacity-70 border border-gray-700 rounded-lg p-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                  placeholder="your@gmail.com"
                  required
                />
              </div>

              <div>
                <label className="block text-cyan-300 text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  className="w-full bg-gray-900 bg-opacity-70 border border-gray-700 rounded-lg p-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all min-h-[120px]"
                  placeholder="Disucss your problem..."
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-4 rounded-lg hover:opacity-90 transition duration-300 shadow-md"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiSend className="w-5 h-5" />
                <span>Submit</span>
              </motion.button>
            </div>
          </motion.form>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg p-8 rounded-xl border border-gray-700 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="w-3 h-3 rounded-full bg-blue-400 mr-3 animate-pulse"></span>
                Communication
              </h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gray-900 rounded-lg">
                    <FiMapPin className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-300">Headquarters</h4>
                    <p className="text-gray-400">123 Mughal Pora, Lahore District</p>
                    <p className="text-gray-400">Punjab, Pakistan</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gray-900 rounded-lg">
                    <FiPhone className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-300">Phone Number</h4>
                    <p className="text-gray-400">+1 (555) 010-2030</p>
                    <p className="text-gray-400">Emergency: +1 (555) 911-9999</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gray-900 rounded-lg">
                    <FiMail className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-300">Digital Courier</h4>
                    <p className="text-gray-400">contact@legal.io</p>
                    <p className="text-gray-400">support@legal.io</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gray-900 rounded-lg">
                    <FiClock className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-300">Availability</h4>
                    <p className="text-gray-400">08:00 - 20:00 (Earth Time)</p>
                    <p className="text-gray-400">Available 24/7 Online</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Map */}
            <div className="rounded-xl overflow-hidden shadow-xl border border-gray-700">
              <iframe
                src="https://maps.google.com/maps?q=MughalPora%20Lane%20Tech%20District&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="w-full h-64 md:h-72"
                allowFullScreen
                loading="lazy"
                title="Quantum Location"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
