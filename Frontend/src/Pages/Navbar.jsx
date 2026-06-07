import React from 'react'
import './Navbar.css'

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
      <ul className="nav-links">
        <li onClick={() => scrollToSection("works")}>Works</li>
        <li onClick={() => scrollToSection("experiments")}>Experiments</li>
        <li onClick={() => scrollToSection("playground")}>Playground</li>
      </ul>

      <button className="connect-btn" onClick={() => scrollToSection("connect")}>
        Connect 😄
      </button>
    </nav>
  )
}

export default Navbar