import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/layout/Layout";
import Dashboard from "./components/pages/Dashboard";
import BachblutenRad from "./components/pages/BachblutenRad";
// import Register from "./components/auth/Register";
// import Login from "./components/auth/Login";
import UnifiedAuthPage from "./components/auth/unifiedAuthPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import "./styles/tailwind.css";
import "./styles/globals.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/auth" element={<UnifiedAuthPage />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/bachbluten-rad" element={<BachblutenRad />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
