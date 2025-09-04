import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  const sectionStyle = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "0 20px",
    backgroundImage: ` url('/background.png')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    color: "white",
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    maxWidth: "1200px",
    width: "100%",
  };

  const imageStyle = {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "4px solid #FACC15", // yellow border
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    marginBottom: "20px",
  };

  const headingStyle = {
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "15px",
  };

  const spanStyle = {
    color: "#FACC15", // yellow highlight
  };

  const paraStyle = {
    fontSize: "18px",
    maxWidth: "700px",
    margin: "0 auto 30px auto",
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
      <div style={containerStyle}>
        {/* 👤 Your personal image */}
        <img
          src="/ikenna2.jpg" // replace with your image in public/
          alt="My Profile"
          style={imageStyle}
        />

        <h2 style={headingStyle}>
          Hi, I’m <span style={spanStyle}>Chieke Ikenna</span>
        </h2>

        <p style={paraStyle}>
          I build modern, responsive websites & digital solutions for businesses
          and individuals.
        </p>

       <Link
          to="/portfolio"
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#FDE047")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#FACC15")}
        >
          View My Work
        </Link>
      </div>
    </section>
  );
}