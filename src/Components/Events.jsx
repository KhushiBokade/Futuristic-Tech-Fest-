import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import './Events.css';

const Events = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.7,
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  };

  // Animation variants for event cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 15px 30px rgba(219, 39, 119, 0.4)",
      transition: { duration: 0.3 }
    }
  };

  // Animation variants for title
  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut", 
        delay: 0.2 
      }
    }
  };

  // Animation for glowing underline
  const underlineVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: {
      width: "100px",
      opacity: 1,
      transition: { 
        duration: 1, 
        ease: "easeOut", 
        delay: 0.8 
      }
    }
  };

  // Animation for event content
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: index => ({
      opacity: 1,
      transition: { 
        delay: 0.3 + (index * 0.15),
        duration: 0.5
      }
    })
  };

  // Animation for button
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: index => ({
      opacity: 1,
      scale: 1,
      transition: { 
        delay: 0.5 + (index * 0.15),
        duration: 0.5
      }
    }),
    hover: {
      scale: 1.1,
      backgroundColor: "#db2777",
      boxShadow: "0px 8px 20px rgba(219, 39, 119, 0.6)",
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.95 
    }
  };

  // Event data
  const eventsData = [
    {
      title: "CRYPTOCRUX",
      description: "Crack the Core, Unleash the future!",
      link: "https://bitly.cx/C9Tdf"
    },
    {
      title: "ELECTROBLITZ",
      description: "Circuit Unleashed!",
      link: "https://bitly.cx/y4cv"
    },
    {
      title: "WEB RESHAPE",
      description: "Revamp. Reinvent. Reshape!",
      link: "https://bitly.cx/TAkx"
    },
    {
      title: "INSOMNIA",
      description: "Sleep is optional. Code through the dawn!",
      link: "https://bitly.cx/obdA"
    }
  ];

  return (
    <motion.section
      className="events-section"
      id="events"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="events-header">
        <motion.h1
          className="events-title"
          variants={titleVariants}
        >
          Events
          <motion.div 
            className="events-title-underline"
            variants={underlineVariants}
          />
        </motion.h1>
      </div>

      <div className="events-grid">
        {eventsData.map((event, index) => (
          <motion.div
            key={index}
            className="event-card"
            variants={cardVariants}
            whileHover="hover"
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
          >
            <motion.div className="event-particle event-particle-1" 
              animate={hoveredIndex === index ? {
                x: [0, 20, -20, 0],
                y: [0, -30, -10, 0],
                opacity: [0, 0.8, 0.4, 0],
                scale: [1, 1.2, 0.8, 1]
              } : {}}
              transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
            />
            <motion.div className="event-particle event-particle-2"
              animate={hoveredIndex === index ? {
                x: [0, -30, 20, 0],
                y: [0, 20, 30, 0],
                opacity: [0, 0.6, 0.3, 0],
                scale: [1, 0.8, 1.1, 1]
              } : {}}
              transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity }}
            />
            
            <div className="event-content">
              <motion.h2
                className="event-title"
                custom={index}
                variants={contentVariants}
              >
                {event.title}
              </motion.h2>
              <motion.p
                className="event-description"
                custom={index}
                variants={contentVariants}
              >
                {event.description}
              </motion.p>
              <motion.a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="event-button"
                custom={index}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Register Now
              </motion.a>
            </div>
            
            <motion.div 
              className="event-glow"
              animate={hoveredIndex === index ? {
                opacity: 1,
                scale: 1.2,
                rotate: 15
              } : {
                opacity: 0,
                scale: 1,
                rotate: 0
              }}
              transition={{ duration: 0.8 }}
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Events;