import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function MaintainerTemplateAction() {
  const { id } = useParams();
  const [template, setTemplate] = useState({});
  const [items, setItems] = useState([]);
  const [delayReason, setDelayReason] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("");
  const [file, setFile] = useState(null); // <-- file state
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTemplateDetails();
  }, [id]);

  const fetchTemplateDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:8000/checklist/template_with_items/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTemplate(res.data.template);
      setItems(res.data.items);
      setStatus(res.data.template.status);
      setDelayReason(res.data.template.delay_reason || "");
      setNotes(res.data.template.notes || "");
      setLoading(false);
    } catch (err) {
      console.error("Error fetching template details:", err);
      setLoading(false);
    }
  };

  // Status button only toggles status locally
  const handleStatusToggle = () => {
    setStatus(status === "pending" ? "completed" : "pending");
  };

  // Submit button sends all values to backend, including file
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("status", status);
      formData.append("delay_reason", delayReason);
      formData.append("notes", notes);
      if (file) {
        formData.append("file", file);
      }
      await axios.put(
        `http://localhost:8000/checklist/details/${id}/status`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate(
        `/maintainer-template/${id}?delayReason=${encodeURIComponent(
          delayReason
        )}&notes=${encodeURIComponent(notes)}`
      );
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Checklist Action
      </h1>
      <form
        className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 mb-8"
        onSubmit={e => e.preventDefault()}
      >
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">Title</label>
          <input
            type="text"
            value={template.title}
            disabled
            className="w-full bg-gray-100 rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">
            Description
          </label>
          <textarea
            value={template.description || ""}
            disabled
            className="w-full bg-gray-100 rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">
            Created At
          </label>
          <input
            type="text"
            value={new Date(template.created_at).toLocaleString()}
            disabled
            className="w-full bg-gray-100 rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">
            Checklist Items
          </label>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-left text-sm uppercase tracking-wider">
                  <th className="px-4 py-2">Order</th>
                  <th className="px-4 py-2">Label</th>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Required</th>
                  <th className="px-4 py-2">Frequency</th>
                  <th className="px-4 py-2">Unit</th>
                  <th className="px-4 py-2">Options</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-2">{item.order}</td>
                    <td className="px-4 py-2">{item.label}</td>
                    <td className="px-4 py-2">{item.input_type}</td>
                    <td className="px-4 py-2">
                      {item.required ? "Yes" : "No"}
                    </td>
                    <td className="px-4 py-2">{item.frequency || "-"}</td>
                    <td className="px-4 py-2">{item.unit || "-"}</td>
                    <td className="px-4 py-2">
                      {item.options?.join(", ") || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">
            Delay Reason
          </label>
          <input
            type="text"
            value={delayReason}
            onChange={(e) => setDelayReason(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded px-3 py-2"
            placeholder="Enter reason for delay (if any)"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">
            Additional Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded px-3 py-2"
            placeholder="Any additional notes"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">
            Upload File
          </label>
          <input
            type="file"
            onChange={e => setFile(e.target.files[0])}
            className="w-full bg-white border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">Status</label>
          <button
            type="button"
            className={`px-4 py-2 rounded ${
              status === "pending" ? "bg-blue-500" : "bg-green-500"
            } text-white`}
            onClick={handleStatusToggle}
          >
            Mark as {status === "pending" ? "Completed" : "Pending"}
          </button>
        </div>
        <button
          type="button"
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default MaintainerTemplateAction;