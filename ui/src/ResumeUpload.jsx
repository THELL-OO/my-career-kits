import React, { useState } from "react";
import "./ResumeUpload.css";

const ResumeUploader = ({ onFileSubmit }) => {
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const [fileObject, setFileObject] = useState(null); // Store actual file

  // Handle file selection
  const handleFileUpload = (event) => {
    setError("");
    const file = event.target.files[0];
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Only PDF, DOCX, or TXT files are allowed.");
      setFileInfo(null);
      setFileObject(null);
      return;
    }

    const maxSize = 10 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      setError("File size exceeds 10 MB. Please upload a smaller file.");
      console.log(file.size)
      setFileInfo(null);
      setFileObject(null);
      return;
    }

    setFileInfo({
      name: file.name,
      size: (file.size / 1024).toFixed(1),
    });

    setFileObject(file);
    console.log('File Upload Successfully!')
  };

  // Drag & drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload({ target: { files: [file] } });
  };

  const removeFile = () => {
    setFileInfo(null);
    setFileObject(null);
    setError("");
  };

  // Submit file to backend
  const handleSubmit = async () => {
    if (!fileObject) return;

    const formData = new FormData();
    formData.append("resume_file", fileObject);

    const options = {
      method: 'POST', 
      body: formData
    }

    try {
          const response = await fetch("http://localhost:8000/resume_analyze", options);

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log(data.filename)
      console.log(data.score)
      // console.log("Backend response:", data);
      if (onFileSubmit) onFileSubmit(data); // optional callback to parent
    } catch (err) {
      console.error("Error uploading file:", err);
      setError("An error occurred while sending the file.");
    }
  };

  return (
    <div className="resume-uploader-wrapper">
      <h2 className="uploader-title">Upload Your Resume</h2>

      <form
        className={`file-upload-form ${dragActive ? "drag-active" : ""}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <label className="file-label">
          <input
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={handleFileUpload}
            className="file-input"
          />
          <span>Drag & Drop your file here or click to upload</span>
        </label>
      </form>

      {/* File preview badge */}
      {fileInfo && (
        <div className="file-preview">
          <span className="file-name">{fileInfo.name}</span>
          <span className="file-size">{fileInfo.size} KB</span>
          <button className="remove-btn" onClick={removeFile}>
            ✕
          </button>
        </div>
      )}

      {/* Submit button appears only if a valid file is uploaded */}
      {fileObject && (
        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default ResumeUploader;
