import React, { useEffect, useRef, useState } from 'react';
import Sidebar from './Pages/Sidebar';
import Navbar from './Pages/Navbar';
import Home from './Pages/Home';
import Work from './Pages/work';
import Experiments from './Pages/Experiment';
import Playground from './Pages/Playground';
import Footer from './Pages/Footer';
import Lenis from '@studio-freight/lenis';
import { motion } from 'framer-motion';

import './App.css';

const App = () => {
  const contentRef = useRef(null);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);

  useEffect(() => {
    const scrollContainer = contentRef.current;
    if (!scrollContainer) return;

    // Initialize Smooth Momentum Scroll Engine
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

  return (
    <div className="main-viewport">
      {/* 1. COLLAPSING SIDEBAR GENERATOR:
         Instead of sliding out horizontally to the left, this block scales down 
         and morphs directly toward the top-left position where the navbar avatar resides.
      */}
      <motion.div 
        className="sidebar-wrapper"
        animate={{ 
          width: isScrolledPastHero ? '32px' : '280px',
          height: isScrolledPastHero ? '32px' : '100vh',
          opacity: isScrolledPastHero ? 0 : 1,
          top: isScrolledPastHero ? '19px' : '0px',   /* Centers perfectly into the navbar row */
          left: isScrolledPastHero ? '24px' : '0px',  /* Aligns directly over the avatar lens */
          borderRadius: isScrolledPastHero ? '50%' : '0px'
        }}
        transition={{ duration: 0.65, cubicBezier: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "top left" }}
      >
        <Sidebar />
      </motion.div>

      {/* 2. Content Framework - Stretches fluidly to 100% */}
      <motion.div 
        className="layout-wrapper"
        animate={{ 
          width: isScrolledPastHero ? '100%' : 'calc(100% - 280px)',
          left: isScrolledPastHero ? '0px' : '280px'
        }}
        transition={{ duration: 0.65, cubicBezier: [0.16, 1, 0.3, 1] }}
      >
        <Navbar isScrolledPastHero={isScrolledPastHero} />
        
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