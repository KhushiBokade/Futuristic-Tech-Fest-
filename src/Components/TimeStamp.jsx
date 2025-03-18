import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import './TimeStamp.css';

const TimeStamp = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Target date - March 21, 2025
  const eventDate = new Date('2025-03-21T00:00:00').getTime();
  
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = eventDate - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        clearInterval(timer);
        // Event has started
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [eventDate]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.03, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <div className="timestamp-container">
      <motion.div 
        className="countdown-wrapper"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="event-details" variants={itemVariants}>
          <motion.h2 
            className="event-title"
            variants={pulseVariants}
            animate="pulse"
          >
            AXIS'25
          </motion.h2>
          <motion.div className="event-info" variants={itemVariants}>
            <div className="info-item">
              <span className="info-icon">📅</span>
              <span>21st-23rd March</span>
            </div>
            <div className="info-item">
              <span className="info-icon">📍</span>
              <span>VNIT, Nagpur</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.h3 className="countdown-title" variants={itemVariants}>
          COUNTDOWN TO EVENT
        </motion.h3>

        <motion.div className="countdown-units" variants={itemVariants}>
          <div className="countdown-unit">
            <div className="count-value">{timeLeft.days}</div>
            <div className="count-label">Days</div>
          </div>
          <div className="countdown-unit">
            <div className="count-value">{timeLeft.hours}</div>
            <div className="count-label">Hours</div>
          </div>
          <div className="countdown-unit">
            <div className="count-value">{timeLeft.minutes}</div>
            <div className="count-label">Minutes</div>
          </div>
          <div className="countdown-unit">
            <div className="count-value">{timeLeft.seconds}</div>
            <div className="count-label">Seconds</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TimeStamp;