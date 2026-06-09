import React, { useEffect, useRef, useState } from 'react';
import Sidebar from './Pages/Sidebar';
import Navbar from './Pages/Navbar';
import Home from './Pages/Home';
import Work from './Pages/work';
import Experiments from './Pages/Experiment';
import Playground from './Pages/Playground';
import Footer from './Pages/Footer';
import Lenis from '@studio-freight/lenis';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEllipsisVertical, FaXmark } from 'react-icons/fa6';
import profile from "./assets/Profile.jpeg"; // Pulls the unified asset avatar

import './App.css';

const App = () => {
  const contentRef = useRef(null);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const scrollContainer = contentRef.current;
    if (!scrollContainer) return;

    const lenis = new Lenis({
      wrapper: scrollContainer,
      content: scrollContainer,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const handleScroll = () => {
      if (scrollContainer.scrollTop > 180) {
        setIsScrolledPastHero(true);
      } else {
        setIsScrolledPastHero(false);
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);

    return () => {
      lenis.destroy();
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const mobileScrollTo = (id) => {
    setIsMobileMenuOpen(false);
    const targetElement = document.getElementById(id);
    const scrollContainer = contentRef.current;
    if (targetElement && scrollContainer) {
      scrollContainer.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="main-viewport">
      
      {/* 📱 Mobile Menu Trigger */}
      <button 
        className="mobile-menu-trigger" 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle Navigation"
      >
        {isMobileMenuOpen ? <FaXmark /> : <FaEllipsisVertical />}
      </button>

      {/* 📱 PREMIUM ASYMMETRIC MOBILE NAV OVERLAY DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="mobile-nav-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "linear" }}
          >
            <motion.div 
              className="mobile-drawer-card"
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Decorative Background Large Watermark Label */}
              <div className="mobile-drawer-bg-text monospace">PRANJAL</div>

              <div className="mobile-drawer-header-meta">
                <span className="monospace">// INDEX DIRECTORY</span>
              </div>

              <nav className="mobile-drawer-navigation">
                <div className="mobile-nav-item" onClick={() => mobileScrollTo("works")}>
                  <span className="nav-item-num monospace">01</span>
                  <span className="nav-item-string">Works</span>
                </div>

                <div className="mobile-nav-item" onClick={() => mobileScrollTo("experiments")}>
                  <span className="nav-item-num monospace">02</span>
                  <span className="nav-item-string">Experiments</span>
                </div>

                <div className="mobile-nav-item" onClick={() => mobileScrollTo("playground")}>
                  <span className="nav-item-num monospace">03</span>
                  <span className="nav-item-string">Playground</span>
                </div>

                <div className="mobile-nav-item mobile-nav-cta-item" onClick={() => mobileScrollTo("connect")}>
                  <span className="nav-item-num monospace">04</span>
                  <span className="nav-item-string highlight-connect">Connect 😄</span>
                </div>
              </nav>

              <div className="mobile-drawer-footer">
                <span className="monospace">© 2026 PRANJAL KUMAR</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. 🖥️ PREMIUM SIDEBAR MORPH FLUID CONTAINER */}
      <motion.div 
        className="sidebar-wrapper desktop-only-layer"
        animate={{ 
          width: isScrolledPastHero ? '32px' : '280px',
          height: isScrolledPastHero ? '32px' : '100vh',
          top: isScrolledPastHero ? '19px' : '0px',   
          left: isScrolledPastHero ? '24px' : '0px',  
          borderRadius: isScrolledPastHero ? '50%' : '0px',
          boxShadow: isScrolledPastHero ? '0 0 0 2px #412D15' : 'none'
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "top left" }}
      >
        {/* CROSS-FADE REVEAL: Switches from full sidebar to smooth avatar lens based on scroll depth */}
        <div className="morph-content-shield" style={{ width: '280px', height: '100%' }}>
          <motion.div
            className="actual-sidebar-embed"
            animate={{ opacity: isScrolledPastHero ? 0 : 1, filter: isScrolledPastHero ? "blur(4px)" : "blur(0px)" }}
            transition={{ duration: 0.25 }}
            style={{ pointerEvents: isScrolledPastHero ? 'none' : 'auto' }}
          >
            <Sidebar />
          </motion.div>

          {isScrolledPastHero && (
            <motion.div 
              className="morph-target-avatar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              <img src={profile} alt="Pranjal Kumar" className="collapsed-lens-img" />
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* 2. Content Layout Viewport Track */}
      <motion.div 
        className="layout-wrapper"
        animate={{ 
          width: isScrolledPastHero ? '100%' : 'calc(100% - 280px)',
          left: isScrolledPastHero ? '0px' : '280px'
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="desktop-navbar-container">
          <Navbar isScrolledPastHero={isScrolledPastHero} />
        </div>
        
        <div className="content" ref={contentRef}>
          <div id="home"><Home /></div>
          <div id="works"><Work /></div>
          <div id="experiments"><Experiments /></div>
          <div id="playground"><Playground /></div>
          <div id="connect"><Footer /></div>
        </div>
      </motion.div>
    </div>
  );
};

export default App;