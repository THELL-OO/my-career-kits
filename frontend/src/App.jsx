import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import './App.css';

import Home from "./pages/Home.jsx";
import ResumeAnalyzer from "./pages/ResumeAnalyzer.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
