import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaRegFileAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Headerfile from "../../SharedComponents/Headerfile";
import Layout from "../../SharedComponents/Layout";

// Define type for a checklist template
interface Template {
  id: number;
  title: string;
  description?: string;
  created_at: string;
  status: string;
}

const MaintainerUsedTemplates: React.FC = () => {
  const [Usedtemplates, setUsedtemplates] = useState<Template[]>([]);
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsedTemplates();
  }, []);

  const fetchUsedTemplates = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get<Template[]>(
        "http://localhost:8000/checklist/usedByMaintainer",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsedtemplates(res.data);
    } catch (err) {
      console.error("Error fetching used checklists:", err);
    }
  };

  const filteredTemplates = Usedtemplates.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 font-sans px-6 py-8">
        <Headerfile title={"Maintainer Checklists"} />

        {/* Search box with gradient border */}
        <div className="mb-10 flex items-center w-full md:w-1/2 bg-white rounded-xl px-4 py-3 shadow-md border-2 border-transparent bg-clip-padding bg-origin-border transition hover:shadow-xl relative">
          <div className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
          <div className="relative flex w-full items-center">
            <FaSearch className="text-indigo-500 mr-3 text-lg transition duration-300 hover:text-purple-500" />
            <input
              type="text"
              placeholder="Search checklists..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-gray-800 placeholder-gray-400 outline-none w-full font-medium transition"
            />
          </div>
        </div>

        {/* Checklist Cards */}
        {filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="p-6 rounded-2xl bg-white shadow-md border border-gray-200 hover:shadow-2xl hover:scale-105 transition-all cursor-pointer relative"
                onClick={() =>
                  navigate(`/maintainer/template-Details/${template.id}`)
                }
              >
                {/* Gradient top border */}
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

                <div className="flex items-center gap-3 mb-3">
                  <FaRegFileAlt className="text-indigo-600 text-2xl transition duration-300 hover:text-purple-600" />
                  <h3 className="text-xl font-semibold text-gray-800 transition">
                    {template.title}
                  </h3>
                </div>

                <p className="text-gray-600 mb-3">
                  {template.description || "No description available"}
                </p>
                <small className="text-gray-400 block">
                  Created: {new Date(template.created_at).toLocaleDateString()}
                </small>

                {/* Status Display */}
                <p className="mt-3 text-sm font-medium text-gray-700">
                  Status:{" "}
                  <span className="text-indigo-600">{template.status}</span>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-6 text-gray-500 text-center text-lg">
            No checklists found.
          </p>
        )}
      </div>
    </Layout>
  );
};

export default MaintainerUsedTemplates;
