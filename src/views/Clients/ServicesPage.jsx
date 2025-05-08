import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import corporate from "../../assets/images/categories/Corporate.jpeg";
import civil from "../../assets/images/categories/civil.jpg";
import family from "../../assets/images/categories/family.jpg";
import criminal from "../../assets/images/categories/criminal.jpg";
import employment from "../../assets/images/categories/employment.jpg";
import realestate from "../../assets/images/categories/realestate.jpg";

const ServicesPage = () => {
  const navigate = useNavigate();

  const allServices = [
    { 
      title: "Corporate Law", 
      image: corporate,
      description: "Legal solutions for business formation, contracts, and transactions."
    },
    { 
      title: "Civil Law", 
      image: civil,
      description: "Resolution for property disputes and personal matters."
    },
    { 
      title: "Family Law", 
      image: family,
      description: "Guidance through divorce, custody, and family issues."
    },
    { 
      title: "Criminal Law", 
      image: criminal,
      description: "Defense for criminal charges at all levels."
    },
    { 
      title: "Employment Law", 
      image: employment,
      description: "Protection for workers' and employers' rights."
    },
    { 
      title: "Real Estate Law", 
      image: realestate,
      description: "Expert handling of property transactions."
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen mt-6">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-10" id="services-section">
        <div className="max-w-6xl mx-auto px-2 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-3"
          >
            Our Legal Services
          </motion.h1>
          <div className="w-20 h-1 bg-blue-300 mx-auto mb-4"></div>
          <p className="text-lg max-w-2xl mx-auto">
            Professional legal assistance across all practice areas
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allServices.map((service, index) => (
            <motion.div
              key={index}
              className="relative h-64 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Image with overlay */}
              <div className="relative h-full">
                <motion.img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/20 to-transparent" />
              </div>

              {/* Visible Title */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-lg font-bold">{service.title}</h3>
              </div>

              {/* Hidden Description */}
              <motion.div
                className="absolute inset-0 bg-blue-900/90 p-4 flex flex-col justify-center text-white"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                <p className="text-sm mb-3">{service.description}</p>
                <motion.button
                  className="self-start border border-white px-3 py-1 text-sm rounded hover:bg-white hover:text-blue-900 transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/services/${service.title.toLowerCase().replace(' ', '-')}`)}
                >
                  View Details
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;