import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { RiReactjsFill } from 'react-icons/ri';
import './Footer.css';

const Footer = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
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

  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 260, damping: 20 }
    },
    hover: {
      scale: 1.2,
      rotate: [0, -10, 10, -10, 0],
      transition: { duration: 0.5 }
    },
    tap: { scale: 0.9 }
  };

  const reactLogoVariants = {
    hidden: { opacity: 0, rotate: -180 },
    visible: {
      opacity: 1,
      rotate: 0,
      transition: { duration: 1, ease: "easeOut" }
    },
    spin: {
      rotate: 360,
      transition: {
        duration: 10,
        ease: "linear",
        repeat: Infinity
      }
    }
  };

  // Social media links
  const socialLinks = [
    {
      name: "Facebook",
      icon: <FaFacebookF />,
      url: "https://www.facebook.com/axisvnit",
      color: "#4267B2"
    },
    {
      name: "Instagram",
      icon: <FaInstagram />,
      url: "https://www.instagram.com/axis_vnit",
      color: "#E1306C"
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn />,
      url: "https://www.linkedin.com/company/axis-vnit-nagpur",
      color: "#0077B5"
    },
    {
      name: "Twitter",
      icon: <FaTwitter />,
      url: "https://twitter.com/axisvnit",
      color: "#1DA1F2"
    }
  ];

  return (
    <motion.footer
      className="footer"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="footer-container">
        <motion.div 
          className="footer-logo-section"
          variants={itemVariants}
        >
          <motion.div
            className="footer-react-logo"
            variants={reactLogoVariants}
            animate="spin"
          >
            <RiReactjsFill />
          </motion.div>
          <h3>AXIS'25</h3>
          <p>UNLEASHING A QUANTUM NEXUS</p>
        </motion.div>

        <motion.div 
          className="footer-social-section"
          variants={itemVariants}
        >
          <motion.h4 variants={itemVariants}>Follow us for updates:</motion.h4>
          
          <motion.div className="social-icons" variants={containerVariants}>
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
                style={{ "--hover-color": link.color }}
                aria-label={`Follow us on ${link.name}`}
              >
                {link.icon}
                <span className="icon-tooltip">{link.name}</span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div 
        className="footer-bottom"
        variants={itemVariants}
      >
        <p>&copy; {new Date().getFullYear()} AXIS VNIT. All rights reserved.</p>
        <motion.div 
          className="footer-glow"
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </motion.div>
    </motion.footer>
  );
};

export default Footer;