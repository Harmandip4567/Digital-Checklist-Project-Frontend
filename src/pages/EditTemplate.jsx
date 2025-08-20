import React, { useState } from "react";
import axios from "axios";

function EditTemplate({ template, templateItems, onClose, onSave }) {
  const [localTemplate, setLocalTemplate] = useState({ ...template });
  const [localItems, setLocalItems] = useState(
    templateItems.map((item) => ({
      ...item,
      required: item.required === true || item.required === "true",
    }))
  );

  const handleItemChange = (index, field, value) => {
    const updated = [...localItems];
    updated[index][field] = value;
    setLocalItems(updated);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const payload = {
        title: localTemplate.title,
        description: localTemplate.description,
        items: localItems,
      };

      const res = await axios.put(
        `http://localhost:8000/checklist/template/${localTemplate.id}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      onSave(res.data, res.data.items);
    } catch (err) {
      console.error("Error saving template:", err.response?.data || err.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      {/* Card */}
      <div className="w-full max-w-4xl bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          ✏️ Edit Template
        </h2>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1 text-sm font-semibold">
            Title
          </label>
          <input
            value={localTemplate.title}
            onChange={(e) =>
              setLocalTemplate({ ...localTemplate, title: e.target.value })
            }
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-1 text-sm font-semibold">
            Description
          </label>
          <textarea
            value={localTemplate.description}
            onChange={(e) =>
              setLocalTemplate({
                ...localTemplate,
                description: e.target.value,
              })
            }
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
            rows="3"
          />
        </div>

        {/* Table */}
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Template Items
        </h3>
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-800 font-semibold">
              <tr>
                
                <th className="px-4 py-3">Label</th>
                <th className="px-4 py-3">Input Type</th>
                <th className="px-4 py-3 text-center">Required</th>
                <th className="px-4 py-3">Frequency</th>
                <th className="px-4 py-3">Unit</th>
              </tr>
            </thead>
            <tbody>
              {localItems.map((item, index) => (
                <tr
                  key={item.id}
                  className={`border-t hover:bg-blue-50 transition ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  
                  <td className="px-4 py-2">
                    <input
                      value={item.label}
                      onChange={(e) =>
                        handleItemChange(index, "label", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      value={item.input_type}
                      onChange={(e) =>
                        handleItemChange(index, "input_type", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={item.required}
                      onChange={(e) =>
                        handleItemChange(index, "required", e.target.checked)
                      }
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      value={item.frequency || ""}
                      onChange={(e) =>
                        handleItemChange(index, "frequency", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      value={item.unit || ""}
                      onChange={(e) =>
                        handleItemChange(index, "unit", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition shadow-sm"
          >
            ❌ Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md transition"
          >
            💾 Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTemplate;

// import React, { useState } from "react";
// import axios from "axios";

// function EditTemplate({ template, templateItems, onClose, onSave }) {
//   const [localTemplate, setLocalTemplate] = useState({ ...template });// Create a copy of the template
//   const [localItems, setLocalItems] = useState(
//   templateItems.map(item => ({
//     ...item,
//     required: item.required === true || item.required === "true" // normalize to boolean
//   }))
// ); // Create a copy of the template items

//   const handleItemChange = (index, field, value) => {
//     const updated = [...localItems];
//     updated[index][field] = value; 
//     setLocalItems(updated);
//   };

//   const handleSave = async () => {
//   try {
//     const token = localStorage.getItem("token");

//     const payload = {
//       title: localTemplate.title,
//       description: localTemplate.description,
//       items: localItems
//     };

//     const res = await axios.put(
//       `http://localhost:8000/checklist/template/${localTemplate.id}`,
//       payload,
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     onSave(res.data, res.data.items);
//   } catch (err) {
//     console.error("Error saving template:", err.response?.data || err.message);
//   }
// };


//   return (
//     <div style={{ border: "1px solid black", padding: "20px", background: "white" }}>
//       <h2>Edit Template</h2>

//       <label>Title: </label>
//       <input
//         value={localTemplate.title}
//         onChange={(e) => setLocalTemplate({ ...localTemplate, title: e.target.value })}
//       />
//       <br />

//       <label>Description: </label>
//       <textarea
//         value={localTemplate.description}
//         onChange={(e) => setLocalTemplate({ ...localTemplate, description: e.target.value })}
//       />
//       <br />

//       <h3>Template Items</h3>
//       <table border="1" cellPadding="8">
//         <thead>
//           <tr>
//             <th>id</th>
//             <th>Label</th>
//             <th>Input Type</th>
//             <th>Required</th>
//             <th>Frequency</th>
//             <th>Unit</th>
//           </tr>
//         </thead>
//         <tbody>
//           {localItems.map((item, index) => (
//             <tr key={item.id}>
//               <td>
//                  <input
//                   value={item.id}
//                   onChange={(e) => handleItemChange(index, "id", e.target.value)}
//                 />
//                 <input
//                   value={item.label}
//                   onChange={(e) => handleItemChange(index, "label", e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   value={item.input_type}
//                   onChange={(e) => handleItemChange(index, "input_type", e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="checkbox"
//                   checked={item.required}
//                   onChange={(e) => handleItemChange(index, "required", e.target.checked)}
//                 />
//               </td>
//               <td>
//                 <input
//                   value={item.frequency || ""}
//                   onChange={(e) => handleItemChange(index, "frequency", e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   value={item.unit || ""}
//                   onChange={(e) => handleItemChange(index, "unit", e.target.value)}
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <button onClick={handleSave}>💾 Save</button>
//       <button onClick={onClose}>❌ Cancel</button>
//     </div>
//   );
// }

// export default EditTemplate;
