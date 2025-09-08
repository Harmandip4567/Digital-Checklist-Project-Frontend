
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaRegFileAlt } from "react-icons/fa"; // Search + template icon
import { useNavigate ,useLocation } from "react-router-dom";
import Headerfile from "../../SharedComponents/Headerfile"
import Layout from "../../SharedComponents/Layout";
import RemoveExistingTemplate from "../../Axios/RemoveExistingTemplate";
const backendURL = "http://localhost:8000";


function ExistingTemplates() {
  const [templates, setTemplates] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [deleted,setDeleted]=useState(false);
  // for getting the parameters during the navigation of sidebar Button delete button 
const location=useLocation();
const queryParams=new URLSearchParams(location.search);
const action=queryParams.get('action');
const templateId=queryParams.get('templateId');

  useEffect(() => {
    fetchTemplates();
  },[location]);

  useEffect(() => {
    if (action === "delete" && templateId ) {
      removeExistingTemplate(templateId);
      navigate('/ExistingTemplates');
    }
  }, [action, templateId]); // Include navigate in dependencies if needed

  // Fetch templates from backend
  const fetchTemplates = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${backendURL}/checklist/templates`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTemplates(res.data);
    } catch (err) {
      console.error("Error fetching templates:", err);
    }
  };

  const filteredTemplates = templates.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      (t.description &&
        t.description.toLowerCase().includes(search.toLowerCase()))
  );


  const removeExistingTemplate = async (Template_id) => {
  try {
    if (await RemoveExistingTemplate(Template_id)) {
      alert("Template deleted successfully");

      // Update state immediately
      setTemplates(prevTemplates =>
        prevTemplates.filter(template => template.id !== Template_id)
      );

      // Then clean the URL (removes query params)
      navigate('/ExistingTemplates');
    }
  } catch (error) {
    console.error("Error deleting template:", error);
  }
};
  return (
    <Layout><div className="min-h-screen bg-gradient-to-tr bg-gray-50 font-sans ">
      <Headerfile title="Existing Templates" className="md-10" />

      {/* Search box with gradient border */}
      <div className="mt-10 mb-8 flex items-center w-full md:w-1/2 bg-white rounded-xl px-4 py-3 shadow-md border-2 border-transparent bg-clip-padding bg-origin-border transition hover:shadow-xl relative">
        <div className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
        <div className="relative flex w-full items-center">
          <FaSearch className="text-purple-500 mr-3 text-lg transition duration-300 hover:text-pink-500" />
          <input
            type="text"
            placeholder="Search templates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-gray-800 placeholder-gray-400 outline-none w-full font-medium transition"
          />
        </div>
      </div>

      {/* Template list */}
      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="p-6 rounded-2xl bg-white shadow-md border border-gray-200 hover:shadow-2xl hover:scale-105 transition-all cursor-pointer relative"
              onClick={() => {
                navigate(`/template/${template.id}`);
              }}
            >
              {/* Gradient top border */}
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

              <div className="flex items-center gap-3 mb-3">
                <FaRegFileAlt className="text-purple-600 text-2xl transition duration-300 hover:text-pink-600" />
                <h3 className="text-2xl font-semibold text-gray-800 transition">
                  {template.title}
                </h3>
              </div>
              <p className="text-gray-600 mb-3">
                {template.description || "No description available"}
              </p>
              <small className="text-gray-400 block">
                Created: {new Date(template.created_at).toLocaleDateString()}
              </small>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevents card click navigation
                  removeExistingTemplate(template.id);
                }}
                className="mt-3 px-4 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 text-white font-semibold rounded-xl shadow-md hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-1"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-6 text-gray-500 text-center text-lg">
          No templates found.
        </p>
      )}
    </div></Layout>
    
  );
}

export default ExistingTemplates;
// src/pages/TemplatesList.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function ExistingTemplates() {
//   const [templates, setTemplates] = useState([]);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     fetchTemplates();
//   }, []);

//   const fetchTemplates = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get("http://localhost:8000/checklist/templates", {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setTemplates(res.data);
//     } catch (err) {
//       console.error("Error fetching templates:", err);
//     }
//   };

//   // Search filter
//   const filteredTemplates = templates.filter(t =>
//     t.title.toLowerCase().includes(search.toLowerCase()) ||
//     (t.description && t.description.toLowerCase().includes(search.toLowerCase()))
//   );

//   return (
//     <div>
//       <h1>Existing Templates</h1>

//       {/* Search box */}
//       <input
//         type="text"
//         placeholder="Search templates..."
//         value={search}
//         onChange={e => setSearch(e.target.value)}
//       />

//       {/* Template list */}
//       {filteredTemplates.length > 0 ? (
//         <ul>
//           {filteredTemplates.map(template => (
//             <li key={template.id}>
//               <h3>{template.title}</h3>
//               <p>{template.description}</p>
//               <small>
//                 Created: {new Date(template.created_at).toLocaleDateString()}
//               </small>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No templates found.</p>
//       )}
//     </div>
//   );
// }

// export default ExistingTemplates;
// // src/pages/TemplatesList.jsx

