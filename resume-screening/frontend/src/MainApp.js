import React, { useState } from "react";
import App from "./App";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import Charts from "./components/Charts";

function MainApp() {
  const [showExtras, setShowExtras] = useState(true);
const [darkMode, setDarkMode] = useState(false);


  return (
    <>
      <Navbar setDarkMode={setDarkMode} />
      <App />
      {showExtras && (
        <>
          <Loader />
          <Charts result={{ score: 60 }} />
        </>
      )}
    </>
  );
}

export default MainApp;
