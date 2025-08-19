

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
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaRegFileAlt } from "react-icons/fa"; // Search + template icon
import { useNavigate } from "react-router-dom";

function ExistingTemplates() {
  const [templates, setTemplates] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8000/checklist/templates", {
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
      (t.description && t.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-blue-100 font-sans px-6 py-8">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 tracking-tight">Existing Templates</h1>

      {/* Search box */}
      <div className="mb-8 flex items-center w-full md:w-1/2 bg-white rounded-xl px-4 py-3 shadow-md border border-gray-200 transition hover:shadow-lg hover:bg-gray-50">
        <FaSearch className="text-gray-400 mr-3 text-lg transition duration-300 hover:text-blue-500" />
        <input
          type="text"
          placeholder="Search templates..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent text-gray-800 placeholder-gray-400 outline-none w-full font-medium transition"
        />
      </div>

      {/* Template list */}
      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="p-6 rounded-2xl bg-white shadow-md border border-gray-200 hover:shadow-2xl hover:scale-105 transition-all cursor-pointer"
              onClick={() => {
                navigate(`/template/${template.id}`);
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <FaRegFileAlt className="text-blue-600 text-2xl transition duration-300 hover:text-blue-800" />
                <h3 className="text-2xl font-semibold text-gray-800 transition">{template.title}</h3>
              </div>
              <p className="text-gray-600 mb-3">{template.description || "No description available"}</p>
              <small className="text-gray-400 block">Created: {new Date(template.created_at).toLocaleDateString()}</small>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-6 text-gray-500 text-center text-lg">No templates found.</p>
      )}
    </div>
  );
}

export default ExistingTemplates;

