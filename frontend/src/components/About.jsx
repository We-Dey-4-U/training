import React, { useState, useEffect } from "react";

export default function About() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      id="about"
      style={{
        padding: "80px 20px",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "32px",
          fontWeight: "bold",
          marginBottom: "50px",
          color: "#111827",
        }}
      >
        About Me
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          gap: isMobile ? "30px" : "40px",
        }}
      >
        {/* Left - Profile Image */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <img
            src="/aboutpics.jpg" // place your image inside public folder
            alt="About Me"
            style={{
              width: isMobile ? "200px" : "250px",
              height: isMobile ? "200px" : "250px",
              borderRadius: "50%",
              objectFit: "cover",
              boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
              border: "5px solid #4F46E5",
            }}
          />
        </div>

        {/* Right - Text & Tech Stack */}
        <div style={{ flex: 2 }}>
          <p
            style={{
              color: "#4B5563",
              lineHeight: "1.8",
              fontSize: isMobile ? "16px" : "18px",
              marginBottom: "30px",
            }}
          >
            I am a passionate software developer with strong experience in
            building scalable web and mobile applications. I enjoy solving
            real-world problems and delivering user-friendly digital products.
            I’m always eager to learn, innovate, and take on exciting projects.
          </p>

          {/* Tech Stack */}
          <h3
            style={{
              fontSize: isMobile ? "20px" : "22px",
              fontWeight: "600",
              marginBottom: "15px",
              color: "#111827",
            }}
          >
            My Tech Stack
          </h3>

          <ul
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "15px",
              listStyle: "none",
              padding: 0,
              margin: 0,
              justifyContent: isMobile ? "center" : "flex-start",
            }}
          >
            {["React", "Node.js", "MongoDB", "Web3", "SQL"].map((tech) => (
              <li
                key={tech}
                style={{
                  background: "#EEF2FF",
                  color: "#4F46E5",
                  padding: "10px 18px",
                  borderRadius: "8px",
                  fontWeight: "500",
                  fontSize: isMobile ? "14px" : "16px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                  cursor: "default",
                }}
                onMouseOver={(e) => (e.target.style.background = "#C7D2FE")}
                onMouseOut={(e) => (e.target.style.background = "#EEF2FF")}
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}