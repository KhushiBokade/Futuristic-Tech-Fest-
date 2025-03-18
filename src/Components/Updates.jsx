import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import "./Updates.css";

const Updates = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeVideo, setActiveVideo] = useState(0);
  const [isHovered, setIsHovered] = useState(-1);

  const videos = [
    {
      src: "https://www.youtube.com/embed/BDejxQlDpkQ?si=MZ3DrPYDmeyK3dor",
      title: "Video 1",
    },
    {
      src: "https://www.youtube.com/embed/RF7h_QyoVjg?si=Tt3B_7x0FdXYJLwi",
      title: "Video 2",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const videoVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hovered: {
      opacity: 1, // Explicitly set opacity to ensure visibility
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };
  const thumbnailVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
    hovered: { scale: 1.05, opacity: 1, transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.7, duration: 0.5, ease: "easeOut" },
    },
    hover: {
      scale: 1.1,
      boxShadow: "0 7px 15px rgba(0, 0, 0, 0.4)",
      transition: { duration: 0.3 },
    },
  };

  useEffect(() => {
    // Animate in on component mount
    setTimeout(() => {
      setIsVisible(true);
    }, 300);
  }, []);

  return (
    <div className="axis-container">
      <motion.div
        className="axis-content"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="event-details">
          <motion.h2
            className="event-title"
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >
            AXISVNIT
            <span className="event-subtitle">UNLEASHING A QUANTUM NEXUS</span>
          </motion.h2>
          <div className="event-info">
            <div className="info-item">📅 21st-23rd March</div>
            <div className="info-item">📍 VNIT, Nagpur</div>
            <div className="info-item">🎬 YouTube Channel</div>
          </div>
        </div>

        {/* Video Section */}
        <div className="video-section">
          <motion.h3
            className="video-section-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Featured Videos
          </motion.h3>
          <motion.div
            className="main-video"
            variants={videoVariants}
            initial="hidden"
            animate={isHovered === activeVideo ? "hovered" : "visible"}
            onMouseEnter={() => setIsHovered(activeVideo)}
            onMouseLeave={() => setIsHovered(-1)}
          >
            <div className="animated-border"></div>
            <div className="video-container">
              <iframe
                width="100%"
                height="400"
                src={videos[activeVideo].src}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="video-frame"
              />
            </div>
          </motion.div>

          <div className="thumbnails">
            {videos.map((video, index) => (
              <motion.div
                key={index}
                className={`thumbnail ${activeVideo === index ? "active" : ""}`}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={thumbnailVariants}
                whileHover="hovered"
                onClick={() => setActiveVideo(index)}
                onMouseEnter={() => setIsHovered(index)}
                onMouseLeave={() => setIsHovered(-1)}
              >
                <div
                  className={`thumbnail-overlay ${
                    isHovered === index ? "hovered" : ""
                  }`}
                ></div>
                <div className="thumbnail-container">
                  <iframe
                    src={video.src}
                    title={`Thumbnail ${index}`}
                    frameBorder="0"
                    className="thumbnail-frame"
                  />
                  <div className="thumbnail-title">
                    <span>{video.title}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="footer"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <p className="description">
            AXIS is the Central India's Largest Technical Festival
          </p>
          <div className="buttons">
            <motion.button
              className="button subscribe"
              variants={buttonVariants}
              whileHover="hover"
            >
              <a href="https://www.youtube.com/@AXISVNIT" style={{textDecoration:'none'}}>Subscribe</a>
            </motion.button>
            <motion.button
              className="button more"
              variants={buttonVariants}
              whileHover="hover"
            >
                <a href="https://www.youtube.com/@AXISVNIT" style={{textDecoration:'none'}}>More Videos</a>
              
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Updates;