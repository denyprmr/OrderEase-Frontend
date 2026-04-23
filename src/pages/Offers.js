import React from "react";

function Offers() {
  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "40px", marginBottom: "10px" }}>
        🚧 Coming Soon
      </h1>
      <p style={{ color: "#666" }}>
        Exciting offers are on the way. Stay tuned!
      </p>
    </div>
  );
}

export default Offers;