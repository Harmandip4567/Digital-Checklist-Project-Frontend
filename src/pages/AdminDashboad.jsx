import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiList } from "react-icons/fi";
import UserAccountDropdown from "./UserAccountDropdown";

function AdminDashboard() {
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = Number(localStorage.getItem("user_id"));
    const token = localStorage.getItem("token");

    if (userId && token) {
      axios
        .get(`http://localhost:8000/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setAdmin(res.data))
        .catch((err) => console.error(err));
    }
  }, []);

  if (!admin) return <p className="text-gray-500 text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#004C97] to-[#0072CE] text-white shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <img
              src="/JswLogo.jpg"
              alt="Company Logo"
              className="h-10 w-10 "
            />
            <h1 className="text-2xl font-bold tracking-wide">Admin Dashboard</h1>
          </div>

          {/* User Dropdown */}
          <UserAccountDropdown user={admin} />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Manage Templates</h2>

        <div className="flex flex-wrap gap-4">
          {/* Create Template Button */}
          <button
            onClick={() => navigate("/Create-template")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-3 rounded-xl shadow-md transition-all"
          >
            <FiPlus size={20} />
            Create Checklist Template
          </button>

          {/* Existing Templates Button */}
          <button
            onClick={() => navigate("/ExistingTemplates")}
            className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-5 py-3 rounded-xl shadow-md transition-all"
          >
            <FiList size={20} />
            Existing Checklists
          </button>
        </div>

        {/* Welcome / Info Section */}
        <div className="mt-10 bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Welcome, {admin.username}!</h3>
          <p className="text-gray-600">
            You can create new checklist templates or manage existing ones using the buttons above.
          </p>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// function AdminDashboard() {
//   const [admin, setAdmin] = useState(null);
//   const navigate = useNavigate();
//   useEffect(() => {
//     const userId =Number(localStorage.getItem("user_id"));
//     const token = localStorage.getItem("token");
    
//     if (userId && token) {
//       axios.get(`http://localhost:8000/users/${userId}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       })
//       .then(res => setAdmin(res.data))
//       .catch(err => console.error(err));
//     }
//   }, []);

//   if (!admin) return <p>Loading...</p>;

//   return (
//     <div>
//       <h1>Welcome, {admin.username}</h1>
//       <p>Role: {admin.role}</p>
//       <p>Email: {admin.email}</p>
//        {/* Add Button */}
//       <button onClick={() => navigate("/Create-template")}>
//         Create Checklist Template
//       </button>
//     </div>
//   );
// }

// export default AdminDashboard;

