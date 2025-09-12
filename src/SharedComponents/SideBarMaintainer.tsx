import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FiHome,
  FiFolder,
  FiChevronDown,
  FiChevronRight,
  FiFileText,
} from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import FetchExistingTemplates from "../Axios/FetchExistingTemplates";

// Define TypeScript interface for a template
interface Template {
  id: number;
  title: string;
  description?: string; // optional if backend sometimes doesn't send it
}

const SideBarMaintainer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showTemplates, setShowTemplates] = useState<boolean>(false);
  const [showUsedTemplates, setShowUsedTemplates] = useState<boolean>(false);
  const [existingTemplates, setExistingTemplates] = useState<Template[]>([]);
  const [usedTemplates, setUsedTemplates] = useState<Template[]>([]);

  // Fetch all available templates
  const fetchExistingTemplates = async () => {
    try {
      const res = (await FetchExistingTemplates()) as { data: Template[] };
      setExistingTemplates(res.data);
    } catch (err) {
      console.error("Error fetching existing templates:", err);
    }
  };

  // Fetch templates already used by the maintainer
  const fetchUsedTemplates = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get<Template[]>(
        "http://localhost:8000/checklist/usedByMaintainer",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsedTemplates(res.data);
    } catch (err) {
      console.error("Error fetching used checklists:", err);
    }
  };

  useEffect(() => {
    fetchExistingTemplates();
    fetchUsedTemplates();
  }, [location]);

  return (
    <div className="h-full w-full bg-white/70 backdrop-blur-md shadow-lg flex flex-col p-4">
      <h2 className="text-lg font-bold text-gray-800 mb-6">Menu</h2>
      <ul className="space-y-3">
        {/* Maintainer Dashboard */}
        <li>
          <button
            onClick={() => navigate("/maintainer/dashboard")}
            className="flex items-center space-x-3 cursor-pointer p-2 rounded-md hover:bg-gray-200/70 text-gray-800 w-full text-left"
          >
            <FiHome className="text-xl" />
            <span>Maintainer Dashboard</span>
          </button>
        </li>

        {/* Existing Templates */}
        <li>
          <div className="flex flex-row">
            <button
              onClick={() => navigate("/maintainer/checklists")}
              className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-200/70 text-gray-800"
            >
              <div className="flex items-center space-x-3">
                <FiFolder className="text-xl" />
                <span>Available Templates</span>
              </div>
            </button>
            <button onClick={() => setShowTemplates(!showTemplates)}>
              {showTemplates ? <FiChevronDown /> : <FiChevronRight />}
            </button>
          </div>

          {showTemplates && (
            <ul className="ml-4 mt-2 space-y-1 border-l border-gray-300 pl-3">
              {existingTemplates.map((template) => (
                <li
                  key={template.id}
                  className="flex items-center justify-between relative"
                >
                  <button
                    onClick={() =>
                      navigate(`/maintainer/template-action/${template.id}`)
                    }
                    className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
                  >
                    <FiFileText className="text-gray-500" />
                    {template.title}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </li>

        {/* Used Templates */}
        <li>
          <div className="flex flex-row">
            <button
              onClick={() => navigate("/maintainer/used-templates")}
              className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-200/70 text-gray-800"
            >
              <div className="flex items-center space-x-3">
                <FiFolder className="text-xl" />
                <span>Used Templates</span>
              </div>
            </button>
            <button onClick={() => setShowUsedTemplates(!showUsedTemplates)}>
              {showUsedTemplates ? <FiChevronDown /> : <FiChevronRight />}
            </button>
          </div>

          {showUsedTemplates && (
            <ul className="ml-4 mt-2 space-y-1 border-l border-gray-300 pl-3">
              {usedTemplates.map((template) => (
                <li
                  key={template.id}
                  className="flex items-center justify-between relative"
                >
                  <button
                    onClick={() =>
                      navigate(`/maintainer/template-Details/${template.id}`)
                    }
                    className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
                  >
                    <FiFileText className="text-gray-500" />
                    {template.title}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default SideBarMaintainer;
