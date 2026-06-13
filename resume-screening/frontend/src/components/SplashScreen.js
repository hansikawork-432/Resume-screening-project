import React from "react";

function Loader() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          border: "4px solid #ddd",
          borderTop: "4px solid #4f46e5",
          borderRadius: "50%",
        }}
      ></div>

      <p>Loading...</p>
    </div>
  );
}

export default Loader;