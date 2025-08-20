import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
    }
  }, []);

  if (!maintainer) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Top Blue Bar */}
      <header className="bg-blue-600 text-white flex items-center px-6 py-4 shadow-md">
        <img src="/JswLogo.jpg" alt="Company Logo" className="h-10 mr-4" />
        <h1 className="text-xl font-bold">Maintainer Dashboard</h1>
      </header>

      {/* Dropdown*/}
      <UserAccountDropdown user={maintainer} />

      <div className="flex gap-4 px-6 py-4">
        <button
          onClick={() => navigate("/maintainer-checklists")}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        >
          View & Edit Checklists
        </button>
      </div>
    </div>
  );
}

export default MaintainerDashboard;