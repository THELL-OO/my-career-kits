import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const services = [
    {
      title: "Resume Analyzer",
      description:
        "Upload your resume and get an AI-powered score with smart improvement insights.",
      path: "/resume-analyzer",
      icon: "📄",
    },
    {
      title: "Cover Letter Generator",
      description:
        "Generate personalized cover letters tailored to your job application.",
      path: "/cover-letter",
      icon: "✉️",
    },
    {
      title: "Job Match Analyzer",
      description:
        "Compare your resume with job descriptions and get a compatibility score.",
      path: "/job-match",
      icon: "🎯",
    },
    {
      title: "Skill Gap Detector",
      description:
        "Identify missing skills required for your target role.",
      path: "/skill-gap",
      icon: "🧠",
    },
    {
      title: "Interview Prep Assistant",
      description:
        "Get customized interview questions based on your resume.",
      path: "/interview-prep",
      icon: "🎤",
    },
    {
      title: "Career Path Recommender",
      description:
        "Discover smart career growth paths powered by AI insights.",
      path: "/career-path",
      icon: "🚀",
    },
  ];

  return (
    <div style={styles.page}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <h1 style={styles.title}>My Career Kits</h1>
        <p style={styles.subtitle}>
          Smart AI tools to level up your career journey.
        </p>
      </div>

      {/* Services Grid */}
      <div style={styles.grid}>
        {services.map((service, index) => (
          <Link to={service.path} key={index} style={styles.card}>
            <div style={styles.icon}>{service.icon}</div>
            <h3 style={styles.cardTitle}>{service.title}</h3>
            <p style={styles.description}>{service.description}</p>
            <span style={styles.explore}>Explore →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "80px 60px",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    color: "#fff",
    fontFamily: "Inter, sans-serif",
  },
  hero: {
    textAlign: "center",
    marginBottom: "70px",
  },
  title: {
    fontSize: "48px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  subtitle: {
    fontSize: "18px",
    opacity: 0.8,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "30px",
  },
  card: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(12px)",
    padding: "30px",
    borderRadius: "18px",
    textDecoration: "none",
    color: "white",
    transition: "all 0.3s ease",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
  },
  icon: {
    fontSize: "32px",
    marginBottom: "15px",
  },
  cardTitle: {
    marginBottom: "12px",
  },
  description: {
    fontSize: "14px",
    opacity: 0.8,
    marginBottom: "20px",
  },
  explore: {
    color: "#38bdf8",
    fontWeight: "bold",
  },
};
