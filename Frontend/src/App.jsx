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
      if (scrollContainer.scrollTop > 200) {
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

      {/* 📱 Mobile Drop Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="mobile-nav-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "linear" }}
          >
            <motion.div 
              className="mobile-drawer-card"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
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

      {/* 1. 🖥️ ORIGINAL DESKTOP SIDEBAR TRACK */}
      <motion.div 
        className="sidebar-wrapper"
        animate={{ 
          width: isScrolledPastHero ? '0px' : '280px',
          opacity: isScrolledPastHero ? 0 : 1,
          x: isScrolledPastHero ? -80 : 0
        }}
        transition={{ duration: 0.6, cubicBezier: [0.16, 1, 0.3, 1] }}
      >
        <Sidebar />
      </motion.div>

      {/* 2. 🖥️ ORIGINAL DESKTOP CONTENT VIEWPORT */}
      <motion.div 
        className="layout-wrapper"
        animate={{ 
          width: isScrolledPastHero ? '100%' : 'calc(100% - 280px)',
          left: isScrolledPastHero ? '0px' : '280px'
        }}
        transition={{ duration: 0.6, cubicBezier: [0.16, 1, 0.3, 1] }}
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