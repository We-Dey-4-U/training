import React, { useState, useEffect } from "react";
import { FaReact, FaNodeJs, FaDatabase, FaMobileAlt, FaLaptopCode } from "react-icons/fa";
import { SiMongodb, SiWeb3Dotjs } from "react-icons/si";

const services = [
  {
    title: "Web Development",
    description: "I build responsive, scalable, and modern websites using React and Node.js.",
    icon: <FaLaptopCode size={40} color="#4F46E5" />,
  },
  {
    title: "Backend & Databases",
    description: "I design secure, high-performance APIs and databases with Node.js, MongoDB, and SQL.",
    icon: <FaDatabase size={40} color="#059669" />,
  },
  {
    title: "Web3 & Blockchain",
    description: "I create decentralized applications and blockchain integrations using Web3.js.",
    icon: <SiWeb3Dotjs size={40} color="#9333EA" />,
  },
  {
    title: "UI/UX Design",
    description: "I design user-friendly and modern interfaces with clean, functional layouts.",
    icon: <FaReact size={40} color="#2563EB" />,
  },
  {
    title: "Mobile Apps",
    description: "I build cross-platform mobile apps with React Native for seamless experiences.",
    icon: <FaMobileAlt size={40} color="#F59E0B" />,
  },
  {
    title: "Scalable Solutions",
    description: "From MVPs to enterprise apps, I deliver software that grows with your business.",
    icon: <FaNodeJs size={40} color="#10B981" />,
  },
];

export default function Services() {
  const [columns, setColumns] = useState(window.innerWidth < 768 ? 1 : 3);

  // Handle resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setColumns(window.innerWidth < 768 ? 1 : 3);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      id="services"
      style={{
        padding: "80px 20px",
        backgroundColor: "#F9FAFB",
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
        Services
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: "30px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {services.map((service, index) => (
          <div
            key={index}
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "16px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
              textAlign: "center",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-10px)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.15)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.08)";
            }}
          >
            <div style={{ marginBottom: "20px" }}>{service.icon}</div>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "600",
                marginBottom: "10px",
                color: "#1F2937",
              }}
            >
              {service.title}
            </h3>
            <p style={{ color: "#4B5563", fontSize: "16px", lineHeight: "1.6" }}>
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}