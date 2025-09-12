import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiList } from "react-icons/fi";
import Headerfile from "../../SharedComponents/Headerfile";
import Layout from "../../SharedComponents/Layout";

// Define Maintainer type
interface Maintainer {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface MaintainerError {
  error: string;
}

type MaintainerState = Maintainer | MaintainerError | null;

const MaintainerDashboard: React.FC = () => {
  const [maintainer, setMaintainer] = useState<MaintainerState>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = Number(localStorage.getItem("user_id"));
    const token = localStorage.getItem("token");

    if (userId && token) {
      axios
        .get<Maintainer>(`http://localhost:8000/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setMaintainer(res.data))
        .catch((err) => console.error(err));
    } else {
      setMaintainer({ error: "No user ID or token found" });
    }
  }, []);

  if (!maintainer)
    return <p className="text-gray-500 text-center mt-10">Loading...</p>;
  if ("error" in maintainer)
    return <p className="text-red-500 text-center mt-10">{maintainer.error}</p>;

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 font-sans">
        {/* Header */}
        <Headerfile title={"Maintainer Dashboard"} />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            View and Manage Checklists
          </h2>

          <div className="flex flex-wrap gap-4">
            {/* Existing Templates Button */}
            <button
              onClick={() => navigate("/maintainer/checklists")}
              className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-5 py-3 rounded-xl shadow-md transition-all"
            >
              <FiList size={20} />
              Existing Checklists
            </button>
          </div>

          {/* Welcome / Info Section */}
          <div className="mt-10 bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Welcome, {maintainer.username}!
            </h3>
            <p className="text-gray-600">
              You can view existing checklist templates using the button above.
            </p>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default MaintainerDashboard;
