import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./pages/Authentication/Signup.tsx";
import Login from "./pages/Authentication/Login.tsx";
import AdminDashboard from "./pages/Admin/AdminDashboad.tsx";
import MaintainerDashboard from "./pages/Maintainer/MaintainerDashboad.tsx";
import CreateTemplate from "./pages/Admin/CreateTemplate.tsx";
import ExistingTemplates from "./pages/Admin/ExistingTemplates.tsx";
import TemplateItems from "./pages/Admin/TemplateItems.tsx";
import MaintainerChecklists from "./pages/Maintainer/MaintainerChecklists.tsx";
import MaintainerTemplateDetails from "./pages/Maintainer/MaintainerTemplateDetails.tsx";
import MaintainerTemplateAction from "./pages/Maintainer/MaintainerTemplateAction.tsx";  
import MaintainerUsedTemplates from "./pages/Maintainer/MaintainerUsedTemplates.tsx";
import AdminProtectedRoutes from "./ProtectingRoutes/AdminProtectedRoutes.tsx";
import MaintainerProtectRoutes from "./ProtectingRoutes/MaintainerProtectRoutes.tsx";
const rootElement=document.getElementById("root") as HTMLElement; 
createRoot(rootElement).render(
  <StrictMode>
    <App />
    <BrowserRouter>
      <Routes>
        {/* Signup Page */}
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Protecting Admin Routes */}
        <Route
          path="/admin"
          element={<AdminProtectedRoutes allowedRoles={["Admin"]} />}
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="Create-template" element={<CreateTemplate />} />
          <Route path="ExistingTemplates" element={<ExistingTemplates />} />
          <Route path="template/:id" element={<TemplateItems />} />
        </Route>

        {/* Protecting Maintainer Routes */}
        <Route path="/maintainer" element={<MaintainerProtectRoutes allowableRoles={["Maintainer"]}/>} >
          <Route path="dashboard" element={<MaintainerDashboard />} />
          <Route path="checklists" element={<MaintainerChecklists />} />
          <Route
            path="template-Details/:id"
            element={<MaintainerTemplateDetails />}
          />
          <Route
            path="template-action/:id"
            element={<MaintainerTemplateAction />}
          />
          <Route path="used-templates" element={<MaintainerUsedTemplates />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
