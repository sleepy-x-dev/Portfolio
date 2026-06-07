import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import "./work.css";

const projects = [
  {
    year: "2025",
    title: "ROOTLEARN",
    subtitle: "Learning the Fundamentals",
    description:
      "Implemented machine learning algorithms and mathematical foundations from scratch, packaging them into a zero-dependency library installable via pip.",
    tags: ["Python", "ML Fundamentals", "Open Source"],
    cta: "Install Package →",
    link: "https://pypi.org/project/rootlearn/",
  },
  {
    year: "2025",
    title: "ATSBOOST",
    subtitle: "Automating Opportunity",
    description:
      "Automated ATS resume analysis using NLP and LaTeX generation tailored to job requirements.",
    tags: ["NLP", "Automation", "LaTeX"],
    cta: "GitHub ↗",
    link: "https://github.com/sleepy-x-dev/resume_build",
  },
  {
    year: "2025",
    title: "FINDLE",
    subtitle: "Seeing Through Machines",
    description:
      "Built a real-time face recognition system using OpenCV, Flask, and MongoDB.",
    tags: ["OpenCV", "Flask", "MongoDB"],
    cta: "GitHub ↗",
    link: "https://github.com/sleepy-x-dev/Findle",
  },
  {
    year: "2026",
    title: "AI FINANCIAL RESEARCH TEAM",
    subtitle: "Towards Autonomous Intelligence",
    description:
      "Built a multi-agent financial research engine combining RAG and autonomous workflows for investment research.",
    tags: ["Agents", "RAG", "LLMs"],
    cta: "GitHub ↗",
    link: "https://github.com/sleepy-x-dev/AI-Financial-Research-Team",
  },
];

const Work = () => {
  const sectionRef = useRef(null);
  const [scrollContainer, setScrollContainer] = useState(null);

  useEffect(() => {
    // Finds your custom scroll view container
    const container = document.querySelector(".content");
    if (container) {
      setScrollContainer(container);
    }
  }, []);

  // FIXED CALIBRATION MATRIX: 
  // Changed offset to ["start start", "end end"] so that the tracking math 
  // initializes exactly at 0 when the section header hits the top scroll threshold.
  const { scrollYProgress } = useScroll({
    container: scrollContainer ? { current: scrollContainer } : undefined,
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 20,
    restDelta: 0.001,
  });

  return (
    <section ref={sectionRef} className="work-section">
      
      <div className="work-header">
        <div className="header-meta">
          <span className="section-label">SELECTED WORKS</span>
          <span className="header-arrow">──→</span>
        </div>
        <h2>
          The path from
          <br />
          <span className="serif-italic">curiosity</span> to
          <br />
          intelligent systems.
        </h2>
      </div>

      <div className="journey-right-spine">
        
        {/* Winding Snake Path Tracker */}
        <div className="journey-svg-container">
          <svg
            viewBox="0 0 200 1000"
            preserveAspectRatio="none"
            className="journey-svg"
            fill="none"
          >
            <path
              d="M 100 0 
                 C 180 150,  20 250, 100 400 
                 C 180 550,  20 650, 100 800 
                 L 100 1000"
              className="ghost-path"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <motion.path
              d="M 100 0 
                 C 180 150,  20 250, 100 400 
                 C 180 550,  20 650, 100 800 
                 L 100 1000"
              className="active-path"
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{ pathLength: smoothProgress }}
            />
          </svg>
        </div>

        <div className="origin-zero-symbol">
          <div className="zero-ring"></div>
          <span className="zero-label">00</span>
        </div>

        {projects.map((project, index) => (
          <JourneyNode
            key={project.title}
            index={index}
            project={project}
          />
        ))}
      </div>
    </section>
  );
};

const JourneyNode = ({ project, index }) => {
  return (
    <motion.article
      className="journey-node-row"
      initial="ghost"
      whileInView="awake"
      viewport={{ once: false, margin: "-10% 0px -15% 0px" }}
      variants={{
        ghost: { opacity: 0.1, filter: "blur(4px)", y: 25 },
        awake: { opacity: 1, filter: "blur(0px)", y: 0 }
      }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="node-dot-track-pin">
        <motion.div 
          className="node-dot-element"
          variants={{
            ghost: { backgroundColor: "#ffffff", borderColor: "#E1DCC9", scale: 1 },
            awake: { 
              backgroundColor: "#412D15", 
              borderColor: "#412D15", 
              scale: 1.4,
              boxShadow: "0 0 0 6px rgba(65, 45, 21, 0.05)" 
            }
          }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="project-asymmetric-card">
        <div className="card-header-meta">
          <span className="project-year monospace">{project.year}</span>
          <span className="project-index-tag monospace">// 0{index + 1}</span>
        </div>
        
        <span className="project-subtitle">{project.subtitle}</span>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>

        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="tag-chip">{tag}</span>
          ))}
        </div>

        <a href={project.link} target="_blank" rel="noreferrer" className="project-cta-btn monospace">
          {project.cta}
        </a>
      </div>
    </motion.article>
  );
};

export default Work;