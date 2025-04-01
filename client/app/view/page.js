"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function View() {
  // Dummy data
  const dummyData = [
    {
      pdf_url: "/path/to/pdf1.pdf",
      pdf_title: "Algebra Basics",
      total_score: 80,
      correct_answers: "10/12",
      incorrect_answers: "2/12",
    },
    {
      pdf_url: "/path/to/pdf2.pdf",
      pdf_title: "Geometry Review",
      total_score: 95,
      correct_answers: "19/20",
      incorrect_answers: "1/20",
    },
    {
      pdf_url: "/path/to/pdf3.pdf",
      pdf_title: "Trigonometry Guide",
      total_score: 70,
      correct_answers: "14/20",
      incorrect_answers: "6/20",
    },
    {
      pdf_url: "/path/to/pdf4.pdf",
      pdf_title: "Calculus 101",
      total_score: 85,
      correct_answers: "17/20",
      incorrect_answers: "3/20",
    },
    {
      pdf_url: "/path/to/pdf5.pdf",
      pdf_title: "Statistics for Beginners",
      total_score: 90,
      correct_answers: "18/20",
      incorrect_answers: "2/20",
    },
    {
      pdf_url: "/path/to/pdf6.pdf",
      pdf_title: "Linear Algebra Overview",
      total_score: 65,
      correct_answers: "13/20",
      incorrect_answers: "7/20",
    },
    {
      pdf_url: "/path/to/pdf7.pdf",
      pdf_title: "Discrete Mathematics",
      total_score: 92,
      correct_answers: "23/25",
      incorrect_answers: "2/25",
    },
    {
      pdf_url: "/path/to/pdf8.pdf",
      pdf_title: "Differential Equations",
      total_score: 75,
      correct_answers: "15/20",
      incorrect_answers: "5/20",
    },
    {
      pdf_url: "/path/to/pdf9.pdf",
      pdf_title: "Probability & Combinatorics",
      total_score: 88,
      correct_answers: "22/25",
      incorrect_answers: "3/25",
    },
    {
      pdf_url: "/path/to/pdf10.pdf",
      pdf_title: "Number Theory Basics",
      total_score: 85,
      correct_answers: "17/20",
      incorrect_answers: "3/20",
    },
    {
      pdf_url: "/path/to/pdf11.pdf",
      pdf_title: "Set Theory and Logic",
      total_score: 78,
      correct_answers: "14/18",
      incorrect_answers: "4/18",
    },
    {
      pdf_url: "/path/to/pdf12.pdf",
      pdf_title: "Real Analysis Fundamentals",
      total_score: 90,
      correct_answers: "18/20",
      incorrect_answers: "2/20",
    },
    {
      pdf_url: "/path/to/pdf13.pdf",
      pdf_title: "Complex Numbers Explained",
      total_score: 82,
      correct_answers: "16/20",
      incorrect_answers: "4/20",
    },
    {
      pdf_url: "/path/to/pdf14.pdf",
      pdf_title: "Vector Calculus Introduction",
      total_score: 86,
      correct_answers: "17/20",
      incorrect_answers: "3/20",
    },
    {
      pdf_url: "/path/to/pdf15.pdf",
      pdf_title: "Functions and Graphs",
      total_score: 94,
      correct_answers: "19/20",
      incorrect_answers: "1/20",
    },
  ];

  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    // Fetch data from backend here, but for now use dummy data
    setPdfs(dummyData);
  }, []);

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* Header */}
      <header
        style={{
          backgroundColor: "black",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "white", margin: 0 }}>Math Project</h1>
      </header>

      {/* Grid layout for the PDF cards */}
      <div style={gridStyle}>
        {pdfs.map((pdf, index) => (
          <Link href={`/view/${index}`} key={index} passHref>
            <div
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <iframe
                src={pdf.pdf_url}
                width="100%"
                height="200px"
                style={{ border: "none" }}
              />
              <p>{pdf.pdf_title}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Floating button */}
      <Link href="/upload">
        <button style={floatingButtonStyle}>+ Add a new PDF</button>
      </Link>
    </div>
  );
}

// Responsive grid styles
const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  gap: "20px",
  padding: "20px",
};

// Floating button styles
const floatingButtonStyle = {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  backgroundColor: "red",
  color: "white",
  padding: "15px 30px",
  borderRadius: "50px",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
