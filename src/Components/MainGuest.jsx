import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import person from '../assets/Unknown_person.jpg';
import './MainGuest.css';

const MainGuest = () => {
  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  };

  // Animation variants for cards
  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    hover: {
      y: -10,
      boxShadow: "0px 15px 25px rgba(219, 39, 119, 0.4)",
      transition: { duration: 0.3 }
    }
  };

  // Animation variants for images
  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div 
      className="main-guest-section"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1 
        className="section-title"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        Main Guest
      </motion.h1>

      <div className="guests-container">
        {[1, 2, 3].map((item, index) => (
          <motion.div 
            key={index}
            className="guest-card"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="guest-image-container">
              <motion.img 
                src={person} 
                alt="Guest" 
                variants={imageVariants}
              />
            </div>
            <motion.div 
              className="guest-info"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 * (index + 1), duration: 0.5 }}
            >
              <h2>Name of Guest</h2>
              <p>Distinguished speaker and expert in quantum computing with over 10 years of experience in the field. Known for groundbreaking research in quantum algorithms and their practical applications.</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MainGuest;