import React from "react";
import "./Sidebar.css";
import profile from "../assets/Profile.jpeg";
import {
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaArrowUpRightFromSquare,
} from "react-icons/fa6";

const Sidebar = () => {
  return (
    <aside className="sidebar">

      <div className="profile">

        <img
          className="avatar"
          src={profile}
          alt="Pranjal Kumar"
        />

        <span className="badge">
          Open to Opportunities ✨
        </span>

        <h1>Pranjal Kumar</h1>
        <div className="hor">
             <p className="role">
          AI/ML Architect
        </p>

        <p className="location">
          📍 Varanasi, India
        </p>
        </div>

      </div>

      <div className="links">

        <a
          href="https://www.instagram.com/pranjal._.kumar_/"
          target="_blank"
          rel="noreferrer"
          className="link-card"
        >
          <div className="left">
            <FaInstagram />
            <span>Instagram</span>
          </div>

          <FaArrowUpRightFromSquare />
        </a>

        <a
          href="https://github.com/sleepy-x-dev"
          target="_blank"
          rel="noreferrer"
          className="link-card"
        >
          <div className="left">
            <FaGithub />
            <span>GitHub</span>
          </div>

          <FaArrowUpRightFromSquare />
        </a>

        <a
          href="mailto:pranjalkumar0903@gmail.com"
          className="link-card"
        >
          <div className="left">
            <FaEnvelope />
            <span>Email</span>
          </div>

          <FaArrowUpRightFromSquare />
        </a>

        <a
          href="https://www.linkedin.com/in/pranjal-kumar0903/"
          target="_blank"
          rel="noreferrer"
          className="link-card"
        >
          <div className="left">
            <FaLinkedin />
            <span>LinkedIn</span>
          </div>

          <FaArrowUpRightFromSquare />
        </a>

      </div>

    </aside>
  );
  
};

export default Sidebar;