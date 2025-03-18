import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import Hero from "./Hero";
import TimeStamp from "./TimeStamp";
import MainGuest from "./MainGuest";
import Events from "./Events";
import Footer from "./Footer";
import AIChat from "./AIChat";
import "./Home.css"; // Import the new CSS file

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Animation variants for staggered entry
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  useEffect(() => {
    // Animate in on component mount
    setTimeout(() => {
      setIsVisible(true);
    }, 300);
  }, []);

  return (
    <div className="home-container">
      <motion.div
        className="home-content"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div variants={childVariants}>
          <Hero />
        </motion.div>
        <motion.div variants={childVariants}>
          <TimeStamp />
        </motion.div>
        <motion.div variants={childVariants}>
          <MainGuest />
        </motion.div>
        <motion.div variants={childVariants}>
          <AIChat />
        </motion.div>
        <motion.div variants={childVariants}>
          <Events />
        </motion.div>
        <motion.div variants={childVariants}>
          <Footer />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;