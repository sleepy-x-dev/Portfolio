import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';
import profile from "../assets/Profile.jpeg";

const Navbar = ({ isScrolledPastHero }) => {
  
  const scrollToSection = (id) => {
    const targetElement = document.getElementById(id);
    const scrollContainer = document.querySelector(".content");

    if (targetElement && scrollContainer) {
      const targetPosition = targetElement.offsetTop;
      
      scrollContainer.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav className="navbar">
      
      {/* Brand space waiting for the sidebar element to merge into it */}
      <div className="nav-brand-container">
        <AnimatePresence>
          {isScrolledPastHero && (
            <motion.div 
              className="nav-brand-group" 
              onClick={() => scrollToSection("home")}
              initial={{ opacity: 0, scale: 0.6, filter: "blur(2px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.7, filter: "blur(1px)" }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }} // Slipped a tiny delay to allow seamless blending
            >
              <div className="nav-avatar-frame">
                <img src={profile} alt="Pranjal Kumar" className="nav-avatar-img" />
              </div>
              <span className="nav-brand-string monospace">PRANJAL.ML</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ul className="nav-links">
        <li onClick={() => scrollToSection("works")}>Works</li>
        <li onClick={() => scrollToSection("experiments")}>Experiments</li>
        <li onClick={() => scrollToSection("playground")}>Playground</li>
      </ul>

      <button className="connect-btn" onClick={() => scrollToSection("connect")}>
        Connect 😄
      </button>
    </nav>
  );
};

export default Navbar;