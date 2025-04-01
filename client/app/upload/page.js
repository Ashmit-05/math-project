"use client"; // Ensure this is a Client Component

import { useState } from "react";

export default function Upload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Retrieve existing PDFs from local storage
        const existingPdfs = JSON.parse(localStorage.getItem("pdfs")) || [];
        // Add new PDF to the array
        existingPdfs.push(reader.result);
        // Store updated array back to local storage
        localStorage.setItem("pdfs", JSON.stringify(existingPdfs));
        alert("file uploaded");
      };
      reader.readAsDataURL(file);
    } else {
      alert("choose a file first");
    }
  };

  return (
    <div>
      <h1>Upload PDF</h1>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
