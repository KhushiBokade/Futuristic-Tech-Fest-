// src/components/Header.jsx
import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineReviews } from "react-icons/md";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link for routing
import "./Header.css";
import Feedback from "./Feedback";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  // Animation variants for the logo
  const logoVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  // Animation variants for nav links
  const linkVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5, ease: "easeOut" },
    }),
    hover: {
      scale: 1.1,
      transition: { duration: 0.3 },
    },
  };

  // Animation variants for the mobile menu
  const menuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.3 } },
  };

  // Animation for the MdOutlineReviews icon
  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 15,
      transition: { duration: 0.3 },
    },
    tap: {
      scale: 0.9,
    },
  };

  // Navigation links
  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "EVENTS", path: "/events" },
    { name: "GUESTS", path: "/guests" },
    { name: "UPDATES", path: "/updates" },
  ];

  return (
    <header className="header">
      <div className="header-container">
        <motion.div
          className="header-title-container"
          variants={logoVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="header-title">
            AXIS'25
            <span className="header-subtitle">UNLEASHING A QUANTUM NEXUS</span>
          </h1>
        </motion.div>

        {/* Navigation Links for Desktop */}
        <nav className="nav-desktop">
          <ul>
            {navLinks.map((item, index) => (
              <motion.li
                key={item.name}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={linkVariants}
                whileHover="hover"
              >
                <Link to={item.path}>{item.name}</Link>
              </motion.li>
            ))}
          </ul>
        </nav>

        <div className="header-right">
          {/* Mobile Menu Button */}
          <div className="mobile-menu-toggle">
            <motion.button
              className="hamburger"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </motion.button>
          </div>

          {/* MdOutlineReviews Icon */}
          <motion.div
            className="reviews-icon"
            variants={iconVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => setShowFeedback(!showFeedback)}
          >
            <MdOutlineReviews />
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            className="nav-mobile"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ul>
              {navLinks.map((item, index) => (
                <motion.li
                  key={item.name}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={linkVariants}
                  whileHover="hover"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link to={item.path} onClick={() => setIsMenuOpen(false)}>
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Feedback Modal */}
      {showFeedback && (
        <div className="feedback-overlay" onClick={() => setShowFeedback(false)}>
          <div className="feedback-modal" onClick={(e) => e.stopPropagation()}>
            <Feedback />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;