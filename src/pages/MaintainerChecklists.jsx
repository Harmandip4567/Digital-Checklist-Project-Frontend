import React, { useEffect, useState } from "react";
import axios from "axios";

function MaintainerChecklists() {
  const [templates, setTemplates] = useState([]);
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [statusMap, setStatusMap] = useState({});

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
      // Initialize status map
      const map = {};
      res.data.forEach((t) => {
        map[t.id] = t.status || "pending";
      });
      setStatusMap(map);
    } catch (err) {
      console.error("Error fetching templates:", err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8000/checklist/templates/${id}/status`,
        {
          status: newStatus,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setStatusMap((prev) => ({ ...prev, [id]: newStatus }));
    } catch (err) {
      console.error("Error updating status:", err);
    }
    setUpdatingId(null);
  };

  const filteredTemplates = templates.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      (t.description &&
        t.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#004C97] text-white px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Maintainer Checklists</h1>
      <div className="mb-6 flex items-center w-full md:w-1/2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 shadow-lg">
        <input
          type="text"
          placeholder="Search checklists..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent text-white placeholder-white/70 outline-none w-full"
        />
      </div>
      {filteredTemplates.length > 0 ? (
        <ul className="space-y-4">
          {filteredTemplates.map((template) => (
            <li
              key={template.id}
              className="p-5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20 transition"
            >
              <h3 className="text-xl font-semibold">{template.title}</h3>
              <p className="mt-2">{template.description || "No description"}</p>
              <small className="mt-2 block">
                Created: {new Date(template.created_at).toLocaleDateString()}
              </small>
              <div className="mt-4 flex items-center gap-3">
                <label className="mr-2">Status:</label>
                <select
                  value={statusMap[template.id] || "pending"}
                  onChange={(e) =>
                    handleStatusChange(template.id, e.target.value)
                  }
                  disabled={updatingId === template.id}
                  className="bg-white/20 text-white px-2 py-1 rounded"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
                {updatingId === template.id && (
                  <span className="ml-2">Updating...</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6">No checklists found.</p>
      )}
    </div>
  );
}

export default MaintainerChecklists;
