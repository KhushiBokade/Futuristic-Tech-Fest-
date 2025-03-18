import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import img1 from '../assets/axis.jpg';
import img2 from '../assets/img-2.png';
import img3 from '../assets/img-3.png';
import img4 from '../assets/img-4.png';
import img5 from '../assets/img-5.png';
// Import only the image that exists
// We'll create a mock array with duplicates of this image for the slider demo
import './Hero.css';

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Create an array with the single image repeated for demo purposes
  // Replace this with real images when they become available
  const images = [
    { id: 1, src: img1, alt: "AXIS Event 1" },
    { id: 2, src: img2, alt: "AXIS Event 2" }, // Using the same image as a placeholder
    { id: 3, src: img3, alt: "AXIS Event 3" }, // Using the same image as a placeholder
    { id: 4, src: img4, alt: "AXIS Event 4" }, // Using the same image as a placeholder
    { id: 5, src: img5, alt: "AXIS Event 5" }, // Using the same image as a placeholder
  ];
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change image every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-container">
      <motion.div 
        className="circle left-arrow"
        whileHover={{ scale: 1.2, backgroundColor: '#f472b6' }}
        whileTap={{ scale: 0.9 }}
        onClick={prevSlide}
      >
        <MdKeyboardDoubleArrowLeft />
      </motion.div>
      
      <div className="slider-container">
        <AnimatePresence mode="wait">
          <motion.img 
            key={currentIndex}
            src={images[currentIndex].src} 
            alt={images[currentIndex].alt}
            className="slider-image"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
        
        <motion.div 
          className="overlay-text"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1>AXIS'25</h1>
          <p>UNLEASHING A QUANTUM NEXUS</p>
        </motion.div>
        
        {/* Image dots indicator */}
        <div className="slider-dots">
          {images.map((_, index) => (
            <motion.div 
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>
      </div>
      
      <motion.div 
        className="circle right-arrow"
        whileHover={{ scale: 1.2, backgroundColor: '#f472b6' }}
        whileTap={{ scale: 0.9 }}
        onClick={nextSlide}
      >
        <MdKeyboardDoubleArrowRight />
      </motion.div>
    </div>
  );
};

export default Hero;