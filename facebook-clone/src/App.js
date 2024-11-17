import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomPage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Định nghĩa route */}
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
