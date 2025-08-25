import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiList } from "react-icons/fi";
import UserAccountDropdown from "./UserAccountDropdown";

function MaintainerDashboard() {
  const [maintainer, setMaintainer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = Number(localStorage.getItem("user_id"));
    const token = localStorage.getItem("token");

    if (userId && token) {
      axios
        .get(`http://localhost:8000/users/${userId}`, {
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
  if (maintainer.error)
    return <p className="text-red-500 text-center mt-10">{maintainer.error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#004C97] to-[#0072CE] text-white shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <img src="/JswLogo.jpg" alt="Company Logo" className="h-10 w-10 " />
            <h1 className="text-2xl font-bold tracking-wide">
              Maintainer Dashboard
            </h1>
          </div>

          {/* User Dropdown */}
          <UserAccountDropdown user={maintainer} />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          View and Manage Checklists
        </h2>

        <div className="flex flex-wrap gap-4">
          {/* Create Template Button */}
          {/* <button
            onClick={() => navigate("/maintainer-checklists")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-3 rounded-xl shadow-md transition-all"
          >
            <FiPlus size={20} />
            View Existing Checklists
          </button> */}

          {/* Existing Templates Button */}
          <button
            onClick={() => navigate("/maintainer-checklists")}
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
  );
}

export default MaintainerDashboard;