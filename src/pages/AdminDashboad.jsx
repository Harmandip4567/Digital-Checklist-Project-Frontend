import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

  if (!admin) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Top Blue Bar */}
      <header className="bg-blue-600 text-white flex items-center px-6 py-4 shadow-md">
        <img
          src="/JswLogo.jpg" // Replace with your uploaded logo path
          alt="Company Logo"
          className="h-10 mr-4"
        />
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
      </header>

      {/* Dropdown*/}
      <UserAccountDropdown user={admin} />

          {/* Create Template Button */}
          <button
            onClick={() => navigate("/Create-template")}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            Create Checklist Template
          </button>
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

