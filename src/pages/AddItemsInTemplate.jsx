import React, { useState } from "react";
import axios from "axios";

function AddItemsInTemplate({ templateId, onClose, onSave }) {
  const [formData, setFormData] = useState({
    label: "",
    input_type: "text",
    required: false,
    frequency: "",
    unit: "",
    
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8000/checklist/template/${templateId}/items`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onSave(res.data); // send new item back to parent
    } catch (err) {
      console.error("Error adding item:", err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add New Item</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">Label</label>
            <input
              type="text"
              name="label"
              value={formData.label}
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block">Input Type</label>
            <select
              name="input_type"
              value={formData.input_type}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="checkbox">Checkbox</option>
              <option value="dropdown">Dropdown</option>
            </select>
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="required"
                checked={formData.required}
                onChange={handleChange}
              />
              <span>Required</span>
            </label>
          </div>

          <div>
            <label className="block">Frequency</label>
            <input
              type="text"
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block">Unit</label>
            <input
              type="text"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>

          

          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddItemsInTemplate;
