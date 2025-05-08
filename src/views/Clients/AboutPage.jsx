import React from 'react';
import { motion } from 'framer-motion';
import { FaBalanceScale, FaHandshake, FaRocket, FaUserTie, FaChartLine, FaShieldAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Import images/about - replace these with your actual image paths
import aboutHero from '../../assets/images/about/about-hero.jpg';
import visionImage from '../../assets/images/about/vision.jpg';
import missionImage from '../../assets/images/about/mission.jpg';
import valuesImage from '../../assets/images/about/values.jpg';
import feature1 from '../../assets/images/about/feature-lawyers.jpg';
import feature2 from '../../assets/images/about/feature-ai.jpg';
import feature3 from '../../assets/images/about/feature-security.jpg';
import Navbar from './Navbar';

const AboutPage = () => {
  const features = [
    {
      icon: <FaUserTie className="text-4xl text-blue-600 mb-4" />,
      title: "Expert Lawyers",
      description: "Carefully vetted legal professionals with proven track records",
      image: feature1
    },
    {
      icon: <FaChartLine className="text-4xl text-blue-600 mb-4" />,
      title: "AI Matching",
      description: "Smart algorithms that connect you with the perfect lawyer",
      image: feature2
    },
    {
      icon: <FaShieldAlt className="text-4xl text-blue-600 mb-4" />,
      title: "Secure Platform",
      description: "End-to-end encrypted communications for your privacy",
      image: feature3
    }
  ];
  
  return (
    <>
    <Navbar/>
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      {/* Hero Section with Image */}
      <section className="relative py-32 overflow-hidden bg-gray-900">
        <div className="absolute inset-1">
          <img 
            src={aboutHero} 
            alt="Legal professionals working" 
            className="w-full h-full object-cover opacity-30"
            style={{ 
              height: '120%', // Extend height to allow cropping
              // objectPosition: 'top center' // Explicitly position at top
            }}
            />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
            >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              >
              About <span className="text-blue-300">Proxima Lex</span>
            </motion.h1>
            
            <motion.p
              className="text-xl text-blue-100 max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              >
              Revolutionizing legal services through AI-powered solutions that connect clients with top-tier legal professionals.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
            <div className="h-48 overflow-hidden">
              <img 
                src={visionImage} 
                alt="Vision" 
                className="w-full h-full object-cover"
                />
            </div>
            <div className="bg-orange-900 p-6 text-white">
              <FaRocket className="text-3xl mb-4" />
              <h2 className="text-2xl font-bold">Our Vision</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-700">
                To redefine legal services by leveraging AI technology that simplifies procedures and democratizes access to justice.
              </p>
            </div>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
            <div className="h-48 overflow-hidden">
              <img 
                src={missionImage} 
                alt="Mission" 
                className="w-full h-full object-cover"
                />
            </div>
            <div className="bg-gray-900 p-6 text-white">
              <FaBalanceScale className="text-3xl mb-4" />
              <h2 className="text-2xl font-bold">Our Mission</h2>
            </div>
            <div className="p-6">
              <p className="text-violet-900">
                To bridge the gap between clients and lawyers through intuitive technology that enhances the legal experience.
              </p>
            </div>
          </motion.div>

          {/* Values Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
            <div className="h-48 overflow-hidden">
              <img 
                src={valuesImage} 
                alt="Values" 
                className="w-full h-full object-cover"
                />
            </div>
            <div className="bg-blue-800 p-6 text-white">
              <FaHandshake className="text-3xl mb-4" />
              <h2 className="text-2xl font-bold">Our Values</h2>
            </div>
            <div className="p-6">
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Transparency in all interactions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Trust as our foundation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Innovation through technology</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
            >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Proxima Lex?</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine legal expertise with cutting-edge technology to transform your legal experience
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={feature.image} 
                    alt={feature.title} 
                    className="w-full h-full object-cover"
                    />
                </div>
                <div className="p-8 text-center">
                  {feature.icon}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-gray-800 to-gray-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              >
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-200">Qualified Lawyers</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-blue-200">Satisfied Clients</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              >
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-blue-200">Success Rate</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              >
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-200">Client Support</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-xl p-8 md:p-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Experience Legal Services Reimagined?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of satisfied clients who found their perfect legal match through Proxima Lex
            </p>
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                Get Started Today
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
      </>
  );
};

export default AboutPage;