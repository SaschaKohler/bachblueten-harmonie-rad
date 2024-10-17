import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./components/pages/Dashboard";
import BachblutenRad from "./components/pages/BachblutenRad";
import "./styles/tailwind.css";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/bachbluten-rad" element={<BachblutenRad />} />
          {/* Füge hier weitere Routen hinzu */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
