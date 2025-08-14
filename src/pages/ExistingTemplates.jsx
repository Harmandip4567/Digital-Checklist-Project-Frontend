

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
import { FaSearch } from "react-icons/fa"; // For search icon
import { useNavigate } from "react-router-dom";

function ExistingTemplates() {
  const [templates, setTemplates] = useState([]);
  const [search, setSearch] = useState("");
  const Navigate = useNavigate();
  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8000/checklist/templates", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTemplates(res.data);
    } catch (err) {
      console.error("Error fetching templates:", err);
    }
  };

  const filteredTemplates = templates.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    (t.description && t.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#004C97] text-white px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Existing Templates</h1>

      {/* Search box */}
      <div className="mb-6 flex items-center w-full md:w-1/2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 shadow-lg">
        <FaSearch className="text-white/70 mr-3" />
        <input
          type="text"
          placeholder="Search templates..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="bg-transparent text-white placeholder-white/70 outline-none w-full"
        />
      </div>

      {/* Template list */}
      {filteredTemplates.length > 0 ? (
        <ul className="space-y-4">
          {filteredTemplates.map(template => (
            <li
              key={template.id}
              className="p-5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20 transition"
              onClick={()=>{Navigate(`/template/${template.id}`)}}
            >
              <h3 className="text-xl font-semibold">{template.title}</h3>
              <p className="mt-2">{template.description || "No description"}</p>
              <small className="mt-2 block">
                Created: {new Date(template.created_at).toLocaleDateString()}
              </small>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6">No templates found.</p>
      )}
    </div>
  );
}

export default ExistingTemplates;
