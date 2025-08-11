import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import AdminDashboard from "./pages/AdminDashboad.jsx";
import MaintainerDashboard from "./pages/MaintainerDashboad.jsx";
import CreateTemplate from "./pages/CreateTemplate.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <BrowserRouter>
      <Routes>
        {/* Signup Page */}
        <Route path="/signup" element={<Signup />} />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Admin Dashboard */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        {/* Maintainer Dashboard */}
        <Route path="/maintainer-dashboard" element={<MaintainerDashboard />} />
        {/*creating temperates for admin*/}
        <Route path="/Create-template" element={<CreateTemplate />} />
        
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
