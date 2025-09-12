import React, { useState, useEffect } from "react";
import {
  FiHome,
  FiFilePlus,
  FiFolder,
  FiList,
  FiChevronDown,
  FiChevronRight,
  FiFileText,
  FiMoreVertical,
} from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import FetchExistingTemplates from "../Axios/FetchExistingTemplates";

// Define TypeScript type for template
interface Template {
  id: number;
  title: string;
}

const SidebarAdmin: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showTemplates, setShowTemplates] = useState<boolean>(false);
  const [existingTemplates, setExistingTemplates] = useState<Template[]>([]);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null); // track which template's menu is open

  const fetchExistingTemplates = async () => {
    try {
      const res = await FetchExistingTemplates() as { data: Template[] };
      setExistingTemplates(res.data);
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };

  useEffect(() => {
    fetchExistingTemplates();
  }, [location]);

  return (
    <div className="h-full w-full bg-white/70 backdrop-blur-md shadow-lg flex flex-col p-4">
      <h2 className="text-lg font-bold text-gray-800 mb-6">Menu</h2>
      <ul className="space-y-3">
        {/* Admin Dashboard */}
        <li>
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="flex items-center space-x-3 cursor-pointer p-2 rounded-md hover:bg-gray-200/70 text-gray-800 w-full text-left"
          >
            <FiHome className="text-xl" />
            <span>Admin Dashboard</span>
          </button>
        </li>

        {/* Create Template */}
        <li>
          <button
            onClick={() => navigate("/admin/Create-template")}
            className="flex items-center space-x-3 w-full text-left p-2 rounded-md hover:bg-gray-200/70 text-gray-800"
          >
            <FiFilePlus className="text-xl" />
            <span>Create Template</span>
          </button>
        </li>

        {/* Existing Templates */}
        <li>
          <div className="flex flex-row">
            <button
              onClick={() => navigate("/admin/ExistingTemplates")}
              className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-200/70 text-gray-800"
            >
              <div className="flex items-center space-x-3">
                <FiFolder className="text-xl" />
                <span>Existing Templates</span>
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
                      navigate(`/admin/template/${template.id}?action=view`)
                    }
                    className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
                  >
                    <FiFileText className="text-gray-500" />
                    {template.title}
                  </button>

                  {/* 3 dots button */}
                  <button
                    onClick={() =>
                      setOpenMenuId(openMenuId === template.id ? null : template.id)
                    }
                    className="p-2 rounded-full hover:bg-gray-200"
                  >
                    <FiMoreVertical />
                  </button>

                  {/* Dropdown Menu */}
                  {openMenuId === template.id && (
                    <div className="absolute left-32 top-full mt-1 w-32 bg-white border rounded-md shadow-lg z-10">
                      <button
                        onClick={() =>
                          navigate(`/admin/template/${template.id}?action=add`)
                        }
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Add Tasks
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/admin/template/${template.id}?action=edit`)
                        }
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Edit Tasks
                      </button>
                      <button
                        onClick={() => {
                          navigate(
                            `/admin/ExistingTemplates?action=delete&templateId=${template.id}`
                          );
                          fetchExistingTemplates();
                        }}
                        className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                      >
                        Delete Template
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </li>

        {/* Maintainer submissions */}
        <li className="flex items-center space-x-3 cursor-pointer p-2 rounded-md hover:bg-gray-200/70 text-gray-800">
          <FiList className="text-xl" />
          <span>Maintainer Tasks status</span>
        </li>
      </ul>
    </div>
  );
};

export default SidebarAdmin;
