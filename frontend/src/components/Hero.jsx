import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  const sectionStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    backgroundImage: `url('/background.png')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    color: "white",
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "space-between",
    gap: "30px",
    maxWidth: "1200px",
    width: "100%",
  };

  const contentStyle = { flex: 1 };
  const imageContainerStyle = {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  };
  const imageStyle = {
    width: "100%",
    maxWidth: "350px",
    height: "auto",
    objectFit: "cover",
  };
  const headingStyle = { fontSize: "36px", fontWeight: "bold", marginBottom: "15px" };
  const spanStyle = { color: "#FACC15" };
  const paraStyle = {
    fontSize: "18px",
    maxWidth: "600px",
    margin: "0 auto 30px auto",
    lineHeight: "1.6",
  };
  const buttonContainerStyle = {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
    justifyContent: "center",
  };
  const buttonStyle = {
    padding: "14px 32px",
    backgroundColor: "#FACC15",
    color: "#111827",
    fontWeight: "600",
    borderRadius: "8px",
    textDecoration: "none",
    boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease",
  };

  return (
    <section style={sectionStyle}>
      <div className="hero-container" style={containerStyle}>
        {/* ✅ Text container */}
        <div className="hero-text" style={contentStyle}>
          <h2 style={headingStyle}>
            Hi, I’m <span style={spanStyle}>Chieke Ikenna</span>
          </h2>
          <p style={paraStyle}>
            I build modern, responsive websites & digital solutions for
            businesses and individuals.
          </p>
          <div style={buttonContainerStyle}>
            <Link
              to="/portfolio"
              style={buttonStyle}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#FDE047")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#FACC15")}
            >
              View My Work
            </Link>
            <a
              href="/ikennacv.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              style={buttonStyle}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#FDE047")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#FACC15")}
            >
              Download CV
            </a>
          </div>
        </div>

        {/* ✅ Image container */}
        <div className="hero-image" style={imageContainerStyle}>
          <img src="/ikenna2re.png" alt="My Profile" style={imageStyle} />
        </div>
      </div>

      {/* ✅ Mobile styles */}
      <style>
        {`
          @media (max-width: 768px) {
            .hero-container {
              flex-direction: column; /* stack vertically */
              text-align: center;
              gap: 20px;
            }
            .hero-image {
              order: -1; /* image on top */
            }
            .hero-text h2 {
              font-size: 26px;
            }
            .hero-text p {
              font-size: 16px;
              line-height: 1.5;
              margin-bottom: 20px;
            }
            .hero-container img {
              max-width: 75%;
              margin: 0 auto;
            }
            .hero-text div {
              flex-direction: column;
              gap: 12px;
            }
          }

          @media (max-width: 480px) {
            .hero-text h2 {
              font-size: 22px;
            }
            .hero-text p {
              font-size: 14px;
            }
            .hero-container img {
              max-width: 90%;
            }
          }
        `}
      </style>
    </section>
  );
}