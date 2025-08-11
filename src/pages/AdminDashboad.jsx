import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function AdminDashboard() {
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const userId =Number(localStorage.getItem("user_id"));
    const token = localStorage.getItem("token");
    
    if (userId && token) {
      axios.get(`http://localhost:8080/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setAdmin(res.data))
      .catch(err => console.error(err));
    }
  }, []);

  if (!admin) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome, {admin.username}</h1>
      <p>Role: {admin.role}</p>
      <p>Email: {admin.email}</p>
       {/* Add Button */}
      <button onClick={() => navigate("/create-template")}>
        Create Checklist Template
      </button>
    </div>
  );
}

export default AdminDashboard;
