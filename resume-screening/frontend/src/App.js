import React, { useState } from "react";
import "./App.css";

function App() {
  const [resume, setResume] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!resume || !jobDesc) {
      alert("Please upload resume and enter job description");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("job_description", jobDesc);

    try {
      const res = await fetch("http://127.0.0.1:8000/screen", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data);
    } catch (error) {
      alert("Backend not reachable");
    }

    setLoading(false);
  };

  return (
    

      <div className="card">
        <label>📃 Job Description</label>

        <textarea
          rows="5"
          placeholder="Paste job description here..."
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
        />

        <label style={{ marginTop: "15px" }}>
          📂 Upload Resume (PDF / Image)
        </label>

        <input
          type="file"
          onChange={(e) => setResume(e.target.files[0])}
        />

        <button onClick={handleAnalyze} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

        {result && (
          <div className="result-card">
            <h3>📊 Analysis Result</h3>

            <p>
              <b>Score:</b> {result.score}
            </p>

            <p>
              <b>Experience:</b> {result.experience_years} years
            </p>

            <div>
              <b>Matched Keywords:</b>
              <br />
              {result.matched_keywords &&
              result.matched_keywords.length > 0 ? (
                result.matched_keywords.map((word, index) => (
                  <span key={index} className="badge">
                    {word}
                  </span>
                ))
              ) : (
                <p>No matching keywords found</p>
              )}
            </div>
          </div>
        )}
      </div>
   
  );
}

export default App;
