import React, { useState, useEffect } from "react";
import axios from "axios";
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
function SideBarMaintainer() {
  const navigate = useNavigate();
  const [showTemplates, setShowTemplates] = useState(false);
  const [ShowUSedTemplates, setShowUsedTemplates] = useState(false);
  const [Existingtemplates, setExistingTemplates] = useState([]);
  const [usedTemplates, setUsedtemplates] = useState([]);
  const location = useLocation();

  const fetchExistingTemplates = async () => {
    const res = await FetchExistingTemplates();
    setExistingTemplates(res.data);
  };
  //--------------checklist used by maintainer----------------
  const fetchUsedTemplates = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8000/checklist/usedByMaintainer", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsedtemplates(res.data);
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
            onClick={() => navigate("/maintainer-dashboard")}
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
              onClick={() => {
                navigate("/maintainer-checklists");
              }}
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
              {Existingtemplates.map((template) => (
                <li
                  key={template.id}
                  className="flex items-center justify-between relative"
                >
                  <button
                    onClick={() => {
                      navigate(`/maintainer-template-action/${template.id}`);
                    }}
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

        {/* For showing:  Templates  used by maintainer */}
        <li>
          <div className="flex flex-row">
            <button onClick={()=>{navigate("/maintainer-used-templates")}}
              className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-200/70 text-gray-800"
            >
              <div className="flex items-center space-x-3">
                <FiFolder className="text-xl" />
                <span>Used Templates</span>
              </div>
            </button>
            <button onClick={() => setShowUsedTemplates(!ShowUSedTemplates)}>
              {ShowUSedTemplates ? <FiChevronDown /> : <FiChevronRight />}
            </button>
          </div>

          {ShowUSedTemplates && (
            <ul className="ml-4 mt-2 space-y-1 border-l border-gray-300 pl-3">
              {usedTemplates.map((template) => (
                <li
                  key={template.id}
                  className="flex items-center justify-between relative"
                >
                  <button
                    onClick={() => {
                      navigate(`/maintainer-template-Details/${template.id}`);
                    }}
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
}

export default SideBarMaintainer;
