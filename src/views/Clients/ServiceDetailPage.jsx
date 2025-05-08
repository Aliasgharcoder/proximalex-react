import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPhone, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const ServiceDetailPage = () => {
  const { serviceName } = useParams();
  
  // In a real app, you would fetch this data based on serviceName
  const service = {
    title: "Corporate Law",
    description: "Comprehensive legal solutions for businesses of all sizes.",
    longDescription: `
      Our corporate law practice provides expert legal guidance to businesses at every stage of their lifecycle. 
      From formation to dissolution, we help companies navigate complex legal landscapes while minimizing risk 
      and maximizing opportunities. Our attorneys bring decades of combined experience in corporate governance, 
      compliance, transactions, and dispute resolution.
    `,
    keyAreas: [
      "Business formation and structuring",
      "Contract drafting and negotiation",
      "Mergers and acquisitions",
      "Corporate governance",
      "Regulatory compliance",
      "Intellectual property protection"
    ],
    benefits: [
      "Protect your business interests",
      "Ensure regulatory compliance",
      "Minimize legal risks",
      "Facilitate smooth transactions",
      "Resolve disputes effectively"
    ],
    process: [
      "Initial consultation to understand your needs",
      "Comprehensive legal analysis",
      "Strategy development",
      "Implementation and execution",
      "Ongoing support and review"
    ],
    image: "corporate-law-team.jpg"
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-blue-900 text-white py-28">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              {service.title} <span className="text-blue-300">Services</span>
            </h1>
            <div className="w-24 h-1 bg-blue-300 mb-6"></div>
            <p className="text-xl max-w-3xl">
              {service.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Content */}
          <div className="lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-8 mb-8"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6">About Our {service.title} Practice</h2>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                {service.longDescription}
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Practice Areas</h3>
                  <ul className="space-y-3">
                    {service.keyAreas.map((area, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2 mt-1">•</span>
                        <span className="text-gray-700">{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Client Benefits</h3>
                  <ul className="space-y-3">
                    {service.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2 mt-1">•</span>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Approach</h2>
              <div className="space-y-6">
                {service.process.map((step, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-800 font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">Step {index + 1}</h3>
                      <p className="text-gray-700">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-6 sticky top-6"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Our {service.title} Team</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="text-blue-600 mr-3 mt-1">
                    <FaPhone />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Phone</h4>
                    <p className="text-gray-700">(555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-blue-600 mr-3 mt-1">
                    <FaCalendarAlt />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Office Hours</h4>
                    <p className="text-gray-700">Mon-Fri: 9am-6pm</p>
                    <p className="text-gray-700">Sat: 10am-2pm</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-blue-600 mr-3 mt-1">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Location</h4>
                    <p className="text-gray-700">123 Legal Avenue</p>
                    <p className="text-gray-700">Suite 400</p>
                    <p className="text-gray-700">New York, NY 10001</p>
                  </div>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Schedule Consultation
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailPage;