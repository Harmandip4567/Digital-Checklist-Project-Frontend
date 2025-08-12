// src/pages/ChecklistTemplateCreate.jsx
import React, { useState } from "react";
import axios from "axios";

const emptyStep = () => ({
  order: 1,
  label: "",
  input_type: "text",
  required: false,
  frequency: "",
  unit: "",
  options: [] // for select
});

function CreateTemplate() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState([emptyStep()]);
  const created_at = new Date().toISOString(); // ISO format for backend
  const addStep = () => {
    setSteps(prev => {
      const next = [...prev, { ...emptyStep(), order: prev.length + 1 }];
      return next;
    });
  };

  const removeStep = (index) => {
    setSteps(prev => prev.filter((_, i) => i !== index).map((s, i) => ({...s, order: i+1})));
  };

  const updateStep = (index, key, value) => {
    setSteps(prev => prev.map((s, i) => i === index ? { ...s, [key]: value } : s));
  };

  const handleOptionsChange = (index, raw) => {
    // raw: comma separated
    const arr = raw.split(",").map(s => s.trim()).filter(Boolean);
    updateStep(index, "options", arr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Example: include created_by from localStorage
    const created_by = Number(localStorage.getItem("user_id")) || null;
    const payload = { title, description, created_by, steps };
    
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:8000/checklist/templates", payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Template created");
      // reset
      setTitle(""); setDescription(""); setSteps([emptyStep()]);
    } catch (err) {
      console.error(err);
      alert("Failed to create template");
    }
  };

  return (
    <div>
      <h2>Create Checklist Template</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Template Title:</label>
          <input value={title} onChange={e => setTitle(e.target.value)} required />
        </div>

        <div>
          <label>Description:</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} />
        </div>

        <h3>Checkpoints</h3>
        {steps.map((step, idx) => (
          <div key={idx} style={{ border: "1px solid #ddd", padding: "8px", marginBottom: "8px" }}>
            <div>
              <label>#{step.order} Label:</label>
              <input value={step.label} onChange={e => updateStep(idx, "label", e.target.value)} required />
            </div>

            <div>
              <label>Type:</label>
              <select value={step.input_type} onChange={e => updateStep(idx, "input_type", e.target.value)}>
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="checkbox">Checkbox</option>
                <option value="select">Select / Dropdown</option>
                <option value="date">Date</option>
                <option value="file">File Upload</option>
              </select>
            </div>

            <div>
              <label>Required:</label>
              <input type="checkbox" checked={step.required} onChange={e => updateStep(idx, "required", e.target.checked)} />
            </div>

            <div>
              <label>Frequency:</label>
              <input value={step.frequency} onChange={e => updateStep(idx, "frequency", e.target.value)} placeholder="Weekly/Monthly" />
            </div>

            <div>
              <label>Unit (optional):</label>
              <input value={step.unit} onChange={e => updateStep(idx, "unit", e.target.value)} placeholder="litres / Nm" />
            </div>

            {step.input_type === "select" && (
              <div>
                <label>Options (comma separated):</label>
                <input
                  value={step.options.join(", ")}
                  onChange={e => handleOptionsChange(idx, e.target.value)}
                  placeholder="OK, Needs Repair, Replace"
                />
              </div>
            )}

            <div>
              <button type="button" onClick={() => removeStep(idx)}>Remove</button>
            </div>
          </div>
        ))}

        <div>
          <button type="button" onClick={addStep}>+ Add Checkpoint</button>
        </div>

        <div>
          <button type="submit">Save Template</button>
        </div>
      </form>
    </div>
  );
}
export default CreateTemplate;