import React, { useState, useEffect } from "react";

export default function Contact() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sectionStyle = {
    padding: "80px 20px",
    backgroundColor: "#F3F4F6",
    textAlign: "center",
  };

  const titleStyle = {
    fontSize: isMobile ? "28px" : "36px",
    fontWeight: "700",
    marginBottom: "16px",
    color: "#1F2937",
  };

  const subtitleStyle = {
    fontSize: isMobile ? "16px" : "18px",
    color: "#4B5563",
    marginBottom: "40px",
    lineHeight: "1.6",
  };

  const formStyle = {
    maxWidth: "500px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  };

  const inputStyle = {
    padding: "14px 18px",
    borderRadius: "12px",
    border: "1px solid #D1D5DB",
    fontSize: isMobile ? "14px" : "16px",
    outline: "none",
    transition: "all 0.3s ease",
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: isMobile ? "120px" : "150px",
    resize: "none",
  };

  const buttonStyle = {
    padding: "14px 0",
    borderRadius: "12px",
    border: "none",
    backgroundColor: "#4F46E5",
    color: "#FFFFFF",
    fontSize: isMobile ? "16px" : "18px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  const handleHover = (e) => {
    e.currentTarget.style.backgroundColor = "#4338CA";
  };

  const handleLeave = (e) => {
    e.currentTarget.style.backgroundColor = "#4F46E5";
  };

  return (
    <section id="contact" style={sectionStyle}>
      <h2 style={titleStyle}>Get In Touch</h2>
      <p style={subtitleStyle}>Have a project in mind? Let’s collaborate and make it happen!</p>

      <form style={formStyle}>
        <input type="text" placeholder="Your Name" style={inputStyle} required />
        <input type="email" placeholder="Your Email" style={inputStyle} required />
        <textarea placeholder="Your Message" style={textareaStyle} required></textarea>
        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={handleHover}
          onMouseOut={handleLeave}
        >
          Send Message
        </button>
      </form>
    </section>
  );
}