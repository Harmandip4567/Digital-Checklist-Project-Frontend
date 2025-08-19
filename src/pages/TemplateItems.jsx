import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import EditTemplate from "./EditTemplate";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineInventory2 } from "react-icons/md";

function TemplateItems() {
  const { id } = useParams();
  const [templateItems, setTemplateItems] = useState([]);
  const [template, setTemplate] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchTemplateItems();
  }, [id]);

  const fetchTemplateItems = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:8000/checklist/template_with_items/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTemplateItems(res.data.items);
      setTemplate(res.data.template);
    } catch (err) {
      console.error("Error fetching template items:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <MdOutlineInventory2 className="text-indigo-600" size={32} />
        Template Details
      </h1>

      {/* Template Info Card */}
      {template ? (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{template.title}</h2>
          <p className="text-gray-600 mb-4">{template.description || "No description"}</p>
          <p className="text-sm text-gray-500">
            <span className="font-medium">Created At:</span>{" "}
            {new Date(template.created_at).toLocaleString()}
          </p>

          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md transition-all"
          >
            <FiEdit3 size={18} />
            Edit Template
          </button>
        </div>
      ) : (
        <p className="text-gray-500">Loading template details...</p>
      )}

      {/* Template Items Table */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Template Items</h2>
      {templateItems.length > 0 ? (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-200">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-left text-sm uppercase tracking-wider">
                <th className="px-6 py-3">Task ID</th>
                <th className="px-6 py-3">Label</th>
                <th className="px-6 py-3">Input Type</th>
                <th className="px-6 py-3">Required</th>
                <th className="px-6 py-3">Frequency</th>
                <th className="px-6 py-3">Unit</th>
              </tr>
            </thead>
            <tbody>
              {templateItems.map((item, index) => (
                <tr
                  key={item.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-indigo-50 transition`}
                >
                  <td className="px-6 py-3 font-medium text-gray-700">{item.id}</td>
                  <td className="px-6 py-3 text-gray-600">{item.label}</td>
                  <td className="px-6 py-3 text-gray-600">{item.input_type}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.required
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {item.required ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-gray-600">{item.frequency || "-"}</td>
                  <td className="px-6 py-3 text-gray-600">{item.unit || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No items found for this template.</p>
      )}

      {/* Edit Modal */}
      {isEditing && (
        <EditTemplate
          template={template}
          templateItems={templateItems}
          onClose={() => setIsEditing(false)}
          onSave={(updatedTemplate, updatedItems) => {
            setTemplate(updatedTemplate);
            setTemplateItems(updatedItems);
            setIsEditing(false);
          }}
        />
      )}
    </div>
  );
}

export default TemplateItems;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// function TemplateItems() {
//   const { id } = useParams();
//   const [templateItems, setTemplateItems] = useState([]);
//   const [template, setTemplate] = useState(null);

//   useEffect(() => {
//     fetchTemplateItems();
//   }, [id]);

//   const fetchTemplateItems = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get(
//         `http://localhost:8000/checklist/template_with_items/${id}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setTemplateItems(res.data.items);
//       setTemplate(res.data.template);
//     } catch (err) {
//       console.error("Error fetching template items:", err);
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-2xl font-bold text-gray-800 mb-6">
//         Template Details
//       </h1>

//       {template ? (
//         <div className="bg-white shadow-md rounded-lg p-5 border border-gray-200 mb-8">
//           <p className="mb-2">
//             <span className="font-semibold text-gray-700">Title:</span>{" "}
//             {template.title}
//           </p>
//           <p className="mb-2">
//             <span className="font-semibold text-gray-700">Description:</span>{" "}
//             {template.description || "-"}
//           </p>
//           <p>
//             <span className="font-semibold text-gray-700">Created At:</span>{" "}
//             {new Date(template.created_at).toLocaleString()}
//           </p>
//         </div>
//       ) : (
//         <p className="text-gray-500">Loading template details...</p>
//       )}

//       <h2 className="text-xl font-semibold text-gray-800 mb-4">
//         Template Items
//       </h2>

//       {templateItems.length > 0 ? (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-4 py-2 text-left text-gray-700 font-medium">
//                   TASK ID
//                 </th>
//                 <th className="px-4 py-2 text-left text-gray-700 font-medium">
//                   Label
//                 </th>
//                 <th className="px-4 py-2 text-left text-gray-700 font-medium">
//                   Input Type
//                 </th>
//                 <th className="px-4 py-2 text-left text-gray-700 font-medium">
//                   Required
//                 </th>
//                 <th className="px-4 py-2 text-left text-gray-700 font-medium">
//                   Frequency
//                 </th>
//                 <th className="px-4 py-2 text-left text-gray-700 font-medium">
//                   Unit
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {templateItems.map((item, index) => (
//                 <tr
//                   key={item.id}
//                   className={`border-t border-gray-200 ${
//                     index % 2 === 0 ? "bg-white" : "bg-gray-50"
//                   }`}
//                 >
//                   <td className="px-4 py-2">{item.id}</td>
//                   <td className="px-4 py-2">{item.label}</td>
//                   <td className="px-4 py-2">{item.input_type}</td>
//                   <td className="px-4 py-2">
//                     {item.required ? "Yes" : "No"}
//                   </td>
//                   <td className="px-4 py-2">{item.frequency || "-"}</td>
//                   <td className="px-4 py-2">{item.unit || "-"}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p className="text-gray-500">No items found for this template.</p>
//       )}
// {isEditing && (
//         <EditTemplate
//           template={template}
//           templateItems={templateItems}
//           onClose={() => setIsEditing(false)}
//           onSave={(updatedTemplate, updatedItems) => {
//             setTemplate(updatedTemplate);
//             setTemplateItems(updatedItems);
//             setIsEditing(false);
//           }}
//     </div>
//   );
// }

// export default TemplateItems;
