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
import ExistingTemplates from "./pages/ExistingTemplates.jsx";
import TemplateItems from "./pages/TemplateItems.jsx";
import MaintainerChecklists from "./pages/MaintainerChecklists.jsx";
import MaintainerTemplateDetails from "./pages/MaintainerTemplateDetails.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <BrowserRouter>
      <Routes>
        {/* Signup Page */}
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Admin Dashboard */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        {/* Maintainer Dashboard */}
        <Route path="/maintainer-dashboard" element={<MaintainerDashboard />} />
        {/*creating temperates for admin*/}
        <Route path="/Create-template" element={<CreateTemplate />} />
        <Route path="/ExistingTemplates" element={<ExistingTemplates />} />
        <Route path="/template/:id" element={<TemplateItems />} />
        <Route
          path="/maintainer-checklists"
          element={<MaintainerChecklists />}
        />
        <Route
          path="/maintainer-template/:id"
          element={<MaintainerTemplateDetails />}
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
