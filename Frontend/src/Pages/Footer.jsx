import React, { useState, useEffect } from "react";
import "./Footer.css";

const Footer = () => {
  const [systemTime, setSystemTime] = useState("");

  // Live system clock to mimic a persistent terminal handshake matrix
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeString = now.toISOString().replace("T", " ").substring(0, 19) + " UTC";
      setSystemTime(timeString);
    };
    
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollToTop = () => {
    const container = document.querySelector(".content");
    if (container) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="connect-footer">
      <div className="footer-container">
        
        {/* Top Split: Massive Typographic Action Triggers */}
        <div className="footer-main-grid">
          
          <div className="footer-cta-block">
            <span className="footer-label">[ TRANSMISSION_GATEWAY ]</span>
            <h2 className="footer-pitch">
              Let's construct <br />
              the <span className="serif-italic">autonomous</span> next.
            </h2>
            <p className="footer-desc">
              Open to architectural roles, core machine learning research pipelines, 
              and complex multi-agent orchestration deployment systems.
            </p>
          </div>

          {/* Clean Structural Link Registry */}
          <div className="footer-links-block">
            <span className="footer-label">[ CHANNELS ]</span>
            <nav className="footer-nav-links">
              <a href="mailto:pranjalk3791@gmail.com" className="footer-link-row">
                <span>EMAIL_DIRECT</span>
                <span className="link-arrow">──↗</span>
              </a>
              <a href="https://github.com/sleepy-x-dev" target="_blank" rel="noreferrer" className="footer-link-row">
                <span>GITHUB_REPOS</span>
                <span className="link-arrow">──↗</span>
              </a>
              <a href="https://www.linkedin.com/in/pranjal-kumar0903/" target="_blank" rel="noreferrer" className="footer-link-row">
                <span>LINKEDIN_NETWORK</span>
                <span className="link-arrow">──↗</span>
              </a>
              <a href="https://www.instagram.com/pranjal._.kumar_/" target="_blank" rel="noreferrer" className="footer-link-row">
                <span>INSTAGRAM_FEED</span>
                <span className="link-arrow">──↗</span>
              </a>
            </nav>
          </div>

        </div>

        {/* Bottom Split: System Telemetry and Legal Metadata */}
        <div className="footer-meta-bar">
          
          <div className="meta-left monospace">
            <div className="meta-item">
              <span className="meta-label">HOST_NODE:</span>
              <span className="meta-val">VARANASI // INDIA</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">SYS_TIME:</span>
              <span className="meta-val">{systemTime}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">STATUS:</span>
              <span className="meta-val glow-text">OPEN_FOR_OPPORTUNITIES</span>
            </div>
          </div>

          <div className="meta-right">
            <button onClick={handleScrollToTop} className="scroll-top-btn monospace">
              RETURN_TO_TOP <span className="arrow-up">↑</span>
            </button>
            <div className="copyright-text monospace">
              © 2026 PRANJAL KUMAR. ALL RIGHTS RESERVED. // END_OF_LOG
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;