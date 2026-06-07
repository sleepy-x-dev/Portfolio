import React from 'react';
import './Navbar.css';
import profile from "../assets/Profile.jpeg"; // Pulls the exact asset matching your sidebar setup

const Navbar = () => {
  
  const scrollToSection = (id) => {
    const targetElement = document.getElementById(id);
    const scrollContainer = document.querySelector(".content");

    if (targetElement && scrollContainer) {
      // Calculates the position of the target relative to the scroll container
      const targetPosition = targetElement.offsetTop;
      
      scrollContainer.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav className="navbar">
      
      {/* Dynamic Profile Branding Identity (Triggers landing view jump on click) */}
      <div className="nav-brand-group" onClick={() => scrollToSection("home")}>
        <div className="nav-avatar-frame">
          <img src={profile} alt="Pranjal Kumar" className="nav-avatar-img" />
        </div>
        <span className="nav-brand-string monospace">PRANJAL.ML</span>
      </div>

      {/* Navigation Options Group */}
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