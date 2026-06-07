import React, { useEffect } from 'react'
import Sidebar from './Pages/Sidebar'
import Navbar from './Pages/Navbar'
import Home from './Pages/Home'
import Work from './Pages/work'
import Experiments from './Pages/Experiment'
import Playground from './Pages/Playground'
import Footer from './Pages/Footer'
import Lenis from '@studio-freight/lenis'

import './App.css'

const App = () => {
  useEffect(() => {
    // 1. Locate your right-hand layout scroll pane
    const scrollContainer = document.querySelector(".content");
    if (!scrollContainer) return;

    // 2. Initialize Lenis targeted directly at your content div
    const lenis = new Lenis({
      wrapper: scrollContainer, // The element that has overflow-y: scroll
      content: scrollContainer, // The content inside it
      duration: 1.2,            // How long the smooth transition lasts (higher = more buttery)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Premium exponential easing curve
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,     // Slightly crisp scroll speed adjustment
    });

    // 3. Setup the local requestAnimationFrame loop to handle the scroll updates
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 4. Clean up the loop on component unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <div className="main">
        <Sidebar />
        <div className="layout">
          <Navbar />
          <div className="content">
              <div id="home"><Home /></div>
              <div id="works"><Work /></div>
              <div id="experiments"><Experiments /></div>
              <div id="playground"><Playground /></div>
              <div id="connect"><Footer /></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App