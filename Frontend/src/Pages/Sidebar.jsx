import React from "react";
import "./Sidebar.css";
import profile from "../assets/Profile.jpeg";
import {
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaArrowUpRightFromSquare,
  FaLocationDot
} from "react-icons/fa6";

const Sidebar = () => {
  return (
    <aside className="sidebar-container">
      <div className="sidebar-inner">
        
        {/* Module 01: Hero Center Profile Unit */}
        <div className="profile-hero-block">
          <div className="avatar-frame">
            <img className="avatar-img" src={profile} alt="Pranjal Kumar" />
          </div>

          <div className="status-indicator-badge">
            <span className="live-pulse"></span>
            <span className="badge-text-telemetry">AVAILABLE NOW</span>
          </div>

          <h1 className="display-name">Pranjal Kumar</h1>
          
          <div className="profile-sub-details">
            <span className="pill-role">AI/ML Architect</span>
            <div className="location-context">
              <FaLocationDot className="pin-geo-icon" />
              <span>Varanasi, India</span>
            </div>
          </div>
        </div>

        {/* Module 02: Reordered Channel Matrix (LinkedIn -> GitHub -> Instagram -> Email) */}
        <div className="navigation-channels">
          <div className="panel-tag-header">// ACTIVE_CHANNELS</div>

          {/* 1. LinkedIn */}
          <a href="https://www.linkedin.com/in/pranjal-kumar0903/" target="_blank" rel="noreferrer" className="interactive-channel-card linkedin-hover">
            <div className="card-left-group">
              <div className="icon-box"><FaLinkedin /></div>
              <span className="channel-title">LinkedIn</span>
            </div>
            <FaArrowUpRightFromSquare className="card-arrow-trigger" />
          </a>

          {/* 2. GitHub */}
          <a href="https://github.com/sleepy-x-dev" target="_blank" rel="noreferrer" className="interactive-channel-card github-hover">
            <div className="card-left-group">
              <div className="icon-box"><FaGithub /></div>
              <span className="channel-title">GitHub</span>
            </div>
            <FaArrowUpRightFromSquare className="card-arrow-trigger" />
          </a>

          {/* 3. Instagram */}
          <a href="https://www.instagram.com/pranjal._.kumar_/" target="_blank" rel="noreferrer" className="interactive-channel-card insta-hover">
            <div className="card-left-group">
              <div className="icon-box"><FaInstagram /></div>
              <span className="channel-title">Instagram</span>
            </div>
            <FaArrowUpRightFromSquare className="card-arrow-trigger" />
          </a>

          {/* 4. Email */}
          <a href="mailto:pranjalkumar0903@gmail.com" className="interactive-channel-card email-hover">
            <div className="card-left-group">
              <div className="icon-box"><FaEnvelope /></div>
              <span className="channel-title">Email</span>
            </div>
            <FaArrowUpRightFromSquare className="card-arrow-trigger" />
          </a>
        </div>

      </div>
    </aside>
  );
};

export default Sidebar;