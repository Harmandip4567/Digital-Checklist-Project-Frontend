import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import Headerfile from "../../SharedComponents/Headerfile";
import Layout from "../../SharedComponents/Layout";

// Define a type for a Step
interface Step {
  order: number;
  label: string;
  input_type: "text" | "number" | "checkbox" | "select" | "date" | "file";
  required: boolean;
  frequency?: string;
  unit?: string;
  options: string[];
}

// Function to create an empty step
const emptyStep = (): Step => ({
  order: 1,
  label: "",
  input_type: "text",
  required: false,
  frequency: "",
  unit: "",
  options: [],
});

const CreateTemplate: React.FC = (): React.ReactElement => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [steps, setSteps] = useState<Step[]>([emptyStep()]);
  const navigate = useNavigate();

  // Add a new step
  const addStep = () =>
    setSteps((prev) => [...prev, { ...emptyStep(), order: prev.length + 1 }]);

  // Remove a step by index
  const removeStep = (index: number) =>
    setSteps((prev) =>
      prev
        .filter((_, i) => i !== index)
        .map((s, i) => ({ ...s, order: i + 1 }))
    );

  // Update a step
  const updateStep = (
    index: number,
    key: keyof Step,
    value: Step[keyof Step]
  ) =>
    setSteps((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [key]: value } : s))
    );

  // Handle options input (comma separated)
  const handleOptionsChange = (index: number, raw: string) =>
    updateStep(
      index,
      "options",
      raw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    );

  // Submit template
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a template title");
      return;
    }

    if (steps.length === 0) {
      alert("Please add at least one step");
      return;
    }

    for (const step of steps) {
      if (!step.label.trim()) {
        alert("Please enter a label for all steps");
        return;
      }
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const payload = {
        title,
        description,
        steps: steps.map((step, index) => ({ ...step, order: index + 1 })),
      };

      await axios.post("http://localhost:8000/checklist/templates", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("✅ Template created successfully");
      setTitle("");
      setDescription("");
      setSteps([emptyStep()]);
      navigate("/admin/dashboard");
    } catch (err: any) {
      console.error("Error creating template:", err);
      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        navigate("/login");
      } else {
        alert(err.response?.data?.detail || "❌ Failed to create template");
      }
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <Headerfile title={"Create Checklist Template"} />

        <main className="flex-grow p-6">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-2xl p-8 max-w-5xl mx-auto space-y-8 transition hover:shadow-3xl"
          >
            {/* Template Info */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Template Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Enter template title"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-300 transition"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Enter a short description"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-300 transition"
              />
            </div>

            {/* Steps */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaPlus className="text-blue-600" /> Checkpoints
              </h3>

              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-6 shadow hover:shadow-lg transition"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block mb-1 font-medium text-gray-700">
                        #{step.order} Label
                      </label>
                      <input
                        value={step.label}
                        onChange={(e) =>
                          updateStep(idx, "label", e.target.value)
                        }
                        placeholder="Enter checkpoint label"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-blue-300 hover:border-blue-300 transition outline-none"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 font-medium text-gray-700">
                        Type
                      </label>
                      <select
                        value={step.input_type}
                        onChange={(e) =>
                          updateStep(
                            idx,
                            "input_type",
                            e.target.value as Step["input_type"]
                          )
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-blue-300 hover:border-blue-300 transition outline-none"
                      >
                        <option value="text">Text</option>
                        <option value="number">Number</option>
                        <option value="checkbox">Checkbox</option>
                        <option value="select">Select</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <input
                      type="checkbox"
                      checked={step.required}
                      onChange={(e) =>
                        updateStep(idx, "required", e.target.checked)
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded hover:ring-1 hover:ring-blue-400 transition"
                    />
                    <label className="text-gray-700 font-medium">Required</label>
                  </div>

                  {step.input_type === "select" && (
                    <div className="mb-4">
                      <label className="block mb-1 font-medium text-gray-700">
                        Options (comma separated)
                      </label>
                      <input
                        value={step.options.join(", ")}
                        onChange={(e) => handleOptionsChange(idx, e.target.value)}
                        placeholder="Option1, Option2, Option3"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-blue-300 hover:border-blue-300 transition outline-none"
                      />
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => removeStep(idx)}
                    className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 shadow transition"
                  >
                    <FaTrashAlt /> Remove Checkpoint
                  </button>
                </div>
              ))}
            </div>

            {/* Add Step Button */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={addStep}
                className="flex items-center gap-2 bg-gray-700 text-white px-6 py-2 rounded-xl hover:bg-gray-800 shadow transition"
              >
                <FaPlus /> Add Checkpoint
              </button>
            </div>

            {/* Save Template */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-blue-700 shadow-lg transition"
              >
                Save Template
              </button>
            </div>
          </form>
        </main>
      </div>
    </Layout>
  );
};

export default CreateTemplate;






// src/pages/ChecklistTemplateCreate.jsx
// import React, { useState } from "react";
// import axios from "axios";

// const emptyStep = () => ({
//   order: 1,
//   label: "",
//   input_type: "text",
//   required: false,
//   frequency: "",
//   unit: "",
//   options: [] // for select
// });

// function CreateTemplate() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [steps, setSteps] = useState([emptyStep()]);
//   const created_at = new Date().toISOString(); // ISO format for backend
//   const addStep = () => {
//     setSteps(prev => {
//       const next = [...prev, { ...emptyStep(), order: prev.length + 1 }];
//       return next;
//     });
//   };

//   const removeStep = (index) => {
//     setSteps(prev => prev.filter((_, i) => i !== index).map((s, i) => ({...s, order: i+1})));
//   };

//   const updateStep = (index, key, value) => {
//     setSteps(prev => prev.map((s, i) => i === index ? { ...s, [key]: value } : s));
//   };

//   const handleOptionsChange = (index, raw) => {
//     // raw: comma separated
//     const arr = raw.split(",").map(s => s.trim()).filter(Boolean);
//     updateStep(index, "options", arr);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Example: include created_by from localStorage
//     const created_by = Number(localStorage.getItem("user_id")) || null;
//     const payload = { title, description, created_by, steps };
    
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.post("http://localhost:8000/checklist/templates", payload, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       alert("Template created");
//       // reset
//       setTitle(""); setDescription(""); setSteps([emptyStep()]);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to create template");
//     }
//   };

//   return (
//     <div>
//       <h2>Create Checklist Template</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Template Title:</label>
//           <input value={title} onChange={e => setTitle(e.target.value)} required />
//         </div>

//         <div>
//           <label>Description:</label>
//           <textarea value={description} onChange={e => setDescription(e.target.value)} />
//         </div>

//         <h3>Checkpoints</h3>
//         {steps.map((step, idx) => (
//           <div key={idx} style={{ border: "1px solid #ddd", padding: "8px", marginBottom: "8px" }}>
//             <div>
//               <label>#{step.order} Label:</label>
//               <input value={step.label} onChange={e => updateStep(idx, "label", e.target.value)} required />
//             </div>

//             <div>
//               <label>Type:</label>
//               <select value={step.input_type} onChange={e => updateStep(idx, "input_type", e.target.value)}>
//                 <option value="text">Text</option>
//                 <option value="number">Number</option>
//                 <option value="checkbox">Checkbox</option>
//                 <option value="select">Select / Dropdown</option>
//                 <option value="date">Date</option>
//                 <option value="file">File Upload</option>
//               </select>
//             </div>

//             <div>
//               <label>Required:</label>
//               <input type="checkbox" checked={step.required} onChange={e => updateStep(idx, "required", e.target.checked)} />
//             </div>

//             <div>
//               <label>Frequency:</label>
//               <input value={step.frequency} onChange={e => updateStep(idx, "frequency", e.target.value)} placeholder="Weekly/Monthly" />
//             </div>

//             <div>
//               <label>Unit (optional):</label>
//               <input value={step.unit} onChange={e => updateStep(idx, "unit", e.target.value)} placeholder="litres / Nm" />
//             </div>

//             {step.input_type === "select" && (
//               <div>
//                 <label>Options (comma separated):</label>
//                 <input
//                   value={step.options.join(", ")}
//                   onChange={e => handleOptionsChange(idx, e.target.value)}
//                   placeholder="OK, Needs Repair, Replace"
//                 />
//               </div>
//             )}

//             <div>
//               <button type="button" onClick={() => removeStep(idx)}>Remove</button>
//             </div>
//           </div>
//         ))}

//         <div>
//           <button type="button" onClick={addStep}>+ Add Checkpoint</button>
//         </div>

//         <div>
//           <button type="submit">Save Template</button>
//         </div>
//       </form>
//     </div>
//   );
// }
// export default CreateTemplate;