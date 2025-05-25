import React from "react";
import Navbar from "./Navbar";

const AboutUs = () => {
  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          padding: "100px 20px",
    background: "linear-gradient(to bottom right, #2f5d5b, #5a7d7d, #7f9795)",
          fontFamily: "'Segoe UI', sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            backgroundColor: "white",
            borderRadius: "15px",
            padding: "5px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          {/* Section: General About */}
          <div className="section-heading" style={{ textAlign: "center", marginBottom: "10px" }}>
            <h2 style={{ fontSize: "30px", marginBottom: "5px" }}>
              Preserving History with Technology
            </h2>
            <p style={{ fontSize: "18px", color: "#444", lineHeight: "1.6" }}>
              Our platform bridges the gap between developers and researchers. It enables developers
              to upload AI models and allows researchers to apply these models to historical
              manuscripts. Together, we aim to preserve and analyze valuable historical documents
              using modern technology.
            </p>
          </div>

          {/* Section: Researcher Functionality */}
          <div style={{ marginTop: "10px" }}>
            <h3 style={{ fontSize: "26px", color: "#007f3f", marginBottom: "10px" }}>
              Tools for Researchers
            </h3>
            <p style={{ fontSize: "17px", lineHeight: "1.7", color: "#333" }}>
              As a researcher on the HIST DOC platform, you can upload manuscript images or ZIP
              archives organized into folders. These images can be browsed in a book-like interface.
              <br /><br />
              You can also upload XML ground-truth files to match image files for better comparison.
              All files are manageable — you can rename, delete, and organize them freely. When testing
              models, simply select one, configure its parameters, and view results side-by-side with
              the original image.
              <br /><br />
              After completing the test, you are invited to submit feedback and rate the model to help
              improve future development.
            </p>
          </div>

          {/* Footer */}
          <p
            style={{
              textAlign: "center",
              marginTop: "20px",
              fontWeight: "bold",
              fontSize: "18px",
              color: "#007f3f",
            }}
          >
            This project was developed by Einas Nasasra and Haneen Abu Salook .
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
