import { useState } from "react";

function UploadCard({ onUpload }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleFile = (e) => {
    const selected = e.target.files[0];
    if (!selected || selected.type !== "application/pdf") {
      setError("Only PDF allowed");
      return;
    }
    setFile(selected);
    setError("");
  };

  return (
    <div className="card">
      <input type="file" accept=".pdf" onChange={handleFile} />
      {file && <p>{file.name}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button disabled={!file} onClick={onUpload}>
        Upload
      </button>
    </div>
  );
}

export default UploadCard;
