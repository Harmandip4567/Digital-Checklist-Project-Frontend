import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaRegFileAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MaintainerChecklists = () => {
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

  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:8000/checklist/details/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTemplates((prev) =>
        prev.map((tpl) =>
          tpl.id === id ? { ...tpl, status: res.data.status } : tpl
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const filteredTemplates = templates.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      (t.description &&
        t.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-blue-100 font-sans px-6 py-8">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 tracking-tight">
        Existing Templates
      </h1>

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
      {filteredTemplates.map((template) => (
        <div
          key={template.id}
          className="p-6 rounded-2xl bg-white shadow-md border border-gray-200 hover:shadow-2xl hover:scale-105 transition-all cursor-pointer"
          onClick={() => navigate(`/maintainer-template/${template.id}`)} // <-- Add this here
        >
          <div className="flex items-center gap-3 mb-3">
            <FaRegFileAlt className="text-blue-600 text-2xl transition duration-300 hover:text-blue-800" />
            <h3 className="text-2xl font-semibold text-gray-800 transition">
              {template.title}
            </h3>
          </div>
          <p className="text-gray-600 mb-3">
            {template.description || "No description available"}
          </p>
          <small className="text-gray-400 block">
            Created: {new Date(template.created_at).toLocaleDateString()}
          </small>
          <p className="mt-2 text-gray-700 font-medium">
            Status: {template.status}
          </p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click from triggering navigation
              handleStatusChange(
                template.id,
                template.status === "pending" ? "completed" : "pending"
              );
            }}
          >
            Mark as {template.status === "pending" ? "Completed" : "Pending"}
          </button>
          {/* No edit/add buttons for maintainer */}
        </div>
      ))}

      {/* Template list */}
      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
      ) : (
        <p className="mt-6 text-gray-500 text-center text-lg">
          No templates found.
        </p>
      )}
    </div>
  );
};

export default MaintainerChecklists;