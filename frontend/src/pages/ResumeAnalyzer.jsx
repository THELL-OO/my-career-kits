import React, { useState } from "react";

export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setResult(null);
      setError("");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    if (dropped) {
      setFile(dropped);
      setResult(null);
      setError("");
    }
  };

  const handleSubmit = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("resume_file", file);

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://api.mycareerkits.com/analyze-resume",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to analyze resume");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Something went wrong while uploading.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Resume Analyzer</h1>
        <p style={styles.subtitle}>
          Upload your resume and get an instant AI score.
        </p>

        <div
          style={styles.dropZone}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="fileUpload"
          />

          <label htmlFor="fileUpload" style={styles.uploadLabel}>
            {file ? file.name : "Click or Drag & Drop your resume here"}
          </label>
        </div>

        <button
          style={styles.button}
          onClick={handleSubmit}
          disabled={loading || !file}
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

        {error && <p style={styles.error}>{error}</p>}

        {result && (
          <div style={styles.resultBox}>
            <h3>Analysis Result</h3>
            <p><strong>Filename:</strong> {result.filename}</p>
            <p><strong>Size:</strong> {result.size} bytes</p>
            <p><strong>Score:</strong> {result.score}</p>
            <p>{result.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1e293b, #0f172a)",
    fontFamily: "Inter, sans-serif",
  },
  card: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    padding: "40px",
    borderRadius: "16px",
    width: "420px",
    color: "#fff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
    textAlign: "center",
  },
  title: {
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "14px",
    opacity: 0.8,
    marginBottom: "25px",
  },
  dropZone: {
    border: "2px dashed #38bdf8",
    padding: "30px",
    borderRadius: "12px",
    marginBottom: "20px",
    cursor: "pointer",
  },
  uploadLabel: {
    cursor: "pointer",
    color: "#38bdf8",
  },
  button: {
    padding: "12px 20px",
    background: "#38bdf8",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    color: "#0f172a",
    fontWeight: "bold",
    width: "100%",
  },
  resultBox: {
    marginTop: "20px",
    padding: "15px",
    background: "rgba(255,255,255,0.08)",
    borderRadius: "10px",
    textAlign: "left",
  },
  error: {
    color: "#f87171",
    marginTop: "10px",
  },
};
