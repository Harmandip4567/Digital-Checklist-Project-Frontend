import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineInventory2 } from "react-icons/md";

function MaintainerTemplateDetails() {
  const { id } = useParams();
  const [template, setTemplate] = useState({});
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    } catch (err) {
      console.error("Error fetching template details:", err);
      setLoading(false);
    }
  };

  const handleStatusChange = async () => {
    try {
      const token = localStorage.getItem("token");
      const newStatus = template.status === "pending" ? "completed" : "pending";
      const res = await axios.put(
        `http://localhost:8000/checklist/details/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTemplate((prev) => ({ ...prev, status: res.data.status }));
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <MdOutlineInventory2 className="text-indigo-600" size={32} />
        Template Details
      </h1>
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {template.title}
        </h2>
        <p className="text-gray-600 mb-4">
          {template.description || "No description"}
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-medium">Created At:</span>{" "}
          {new Date(template.created_at).toLocaleString()}
        </p>
        <p className="text-sm text-gray-700 mt-2">
          <span className="font-medium">Status:</span> {template.status}
        </p>
        <button
          onClick={handleStatusChange}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md"
        >
          Mark as {template.status === "pending" ? "Completed" : "Pending"}
        </button>
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Template Items
      </h2>
      {items.length > 0 ? (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-200">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-left text-sm uppercase tracking-wider">
                <th className="px-6 py-3">Order</th>
                <th className="px-6 py-3">Label</th>
                <th className="px-6 py-3">Input Type</th>
                <th className="px-6 py-3">Required</th>
                <th className="px-6 py-3">Frequency</th>
                <th className="px-6 py-3">Unit</th>
                <th className="px-6 py-3">Options</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr
                  key={item.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-indigo-50 transition`}
                >
                  <td className="px-6 py-3 font-medium text-gray-700">
                    {item.order}
                  </td>
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
                  <td className="px-6 py-3 text-gray-600">
                    {item.frequency || "-"}
                  </td>
                  <td className="px-6 py-3 text-gray-600">
                    {item.unit || "-"}
                  </td>
                  <td className="px-6 py-3 text-gray-600">
                    {item.options?.join(", ") || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No items found for this template.</p>
      )}
    </div>
  );
}

export default MaintainerTemplateDetails;