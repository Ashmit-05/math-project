"use client";

import { useEffect, useState } from "react";

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
// This function gets params directly from the routing
export default function PDFDetail({ params }) {
  const { id } = params; // Extract the `id` from the URL
  const [pdf, setPdf] = useState(null);

  useEffect(() => {
    // Fetch data based on ID, for now, use dummyData
    if (id !== undefined) {
      setPdf(dummyData[id]);
    }
  }, [id]);

  if (!pdf) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <header
        style={{
          backgroundColor: "black",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "white", margin: 0 }}>{pdf.pdf_title}</h1>
      </header>

      <div style={{ padding: "20px" }}>
        <iframe
          src={pdf.pdf_url}
          width="100%"
          height="600px"
          style={{ border: "none" }}
        />
        <div style={{ marginTop: "20px" }}>
          <p>
            <strong>Total Score:</strong> {pdf.total_score}
          </p>
          <p>
            <strong>Correct Answers:</strong> {pdf.correct_answers}
          </p>
          <p>
            <strong>Incorrect Answers:</strong> {pdf.incorrect_answers}
          </p>
        </div>
      </div>
    </div>
  );
}
