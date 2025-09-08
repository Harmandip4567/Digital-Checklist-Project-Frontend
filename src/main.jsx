import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./pages/Authentication/Signup.jsx";
import Login from "./pages/Authentication/Login.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboad.jsx";
import MaintainerDashboard from "./pages/Maintainer/MaintainerDashboad.jsx";
import CreateTemplate from "./pages/Admin/CreateTemplate.jsx";
import ExistingTemplates from "./pages/Admin/ExistingTemplates.jsx";
import TemplateItems from "./pages/Admin/TemplateItems.jsx";
import MaintainerChecklists from "./pages/Maintainer/MaintainerChecklists.jsx";
import MaintainerTemplateDetails from "./pages/Maintainer/MaintainerTemplateDetails.jsx";
import MaintainerTemplateAction from "./pages/Maintainer/MaintainerTemplateAction.jsx";  
import MaintainerUsedTemplates from "./pages/Maintainer/MaintainerUsedTemplates.jsx";
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

        {/*creating temperates for admin*/}
        <Route path="/Create-template" element={<CreateTemplate />} />
        <Route path="/ExistingTemplates" element={<ExistingTemplates/>} />
        
        <Route path="/template/:id" element={<TemplateItems/>} />
        {/* Maintainer Dashboard */}
        <Route path="/maintainer-dashboard" element={<MaintainerDashboard />} />
           <Route
          path="/maintainer-checklists"
          element={<MaintainerChecklists />}
        />
        <Route
          path="/maintainer-template-Details/:id"
          element={<MaintainerTemplateDetails />}
        />
        <Route
          path="/maintainer-template-action/:id"
          element={<MaintainerTemplateAction />}
        />
        <Route
          path="/maintainer-used-templates"
          element={<MaintainerUsedTemplates />}
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
