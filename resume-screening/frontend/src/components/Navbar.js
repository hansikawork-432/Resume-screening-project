import React from "react";
function Navbar({ setDarkMode }) {
  return (
    <button onClick={() => setDarkMode(prev => !prev)}>
      Toggle Dark Mode
    </button>
  );
} 
export default Navbar;
