import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function TemplateItems() {
  const { id } = useParams(); // template id from URL
  const [templateItems, setTemplateItems] = useState([]);
  const [template, setTemplate] = useState({}); // null until loaded

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
    <div style={{ padding: "20px" }}>
      <h1>Template Details</h1>

      {template ? (
        <div
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "5px",
          }}
        >
          <p><strong>Title:</strong> {template.title}</p>
          <p><strong>Description:</strong> {template.description || "-"}</p>
          <p><strong>Created At:</strong> {new Date(template.created_at).toLocaleString()}</p>
        </div>
      ) : (
        <p>Loading template details...</p>
      )}

      <h2>Template Items</h2>
      {templateItems.length > 0 ? (
        <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>TASK ID</th>
              <th>Label</th>
              <th>Input Type</th>
              <th>Required</th>
              <th>Frequency</th>
              <th>Unit</th>
            </tr>
          </thead>
          <tbody>
            {templateItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.label}</td>
                <td>{item.input_type}</td>
                <td>{item.required ? "Yes" : "No"}</td>
                <td>{item.frequency || "-"}</td>
                <td>{item.unit || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No items found for this template.</p>
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
//     </div>
//   );
// }

// export default TemplateItems;
