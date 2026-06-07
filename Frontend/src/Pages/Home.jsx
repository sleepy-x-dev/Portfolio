import React from "react";
import { TypeAnimation } from "react-type-animation";
import "./Home.css";

const Home = () => {
  return (
    <section className="home">

      <div className="availability">
        <span className="status-dot"></span>
        AVAILABLE FOR COLLABORATION
      </div>

      <div className="hero">

        <h1 className="hero-title">
          Hi, I'm Pranjal.
          <br />

          I architect intelligent systems
          <br />

          and craft digital experiences
          <br />

          <span className="accent">
            that people remember.
          </span>
        </h1>

        <div className="typing-wrapper">

          <span className="typing-prefix">
            I work as a 
          </span>

          <TypeAnimation
            sequence={[
              " AI Architect",
              2500,

              "",
              700,

              " Full Stack Developer",
              2500,

              "",
              700,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="typing-text"
            cursor={true}
          />

        </div>

        <p className="hero-description">
          I design, develop, and deploy products that bridge
          intelligence with usability. Currently exploring
          multi-agent systems, modern web experiences, and
          ambitious ideas worth building.
        </p>
        </div>
        

    </section>
  )};
;

export default Home;
