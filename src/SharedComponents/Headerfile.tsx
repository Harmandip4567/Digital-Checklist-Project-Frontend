import { useState, useEffect } from "react";
import axios from "axios";
import UserAccountDropdown from "./UserAccountDropdown";

// Define prop types
interface HeaderfileProps {
  title: string;
}

// Define type for admin/user data
interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  // Add other properties if returned from backend
}

const Headerfile: React.FC<HeaderfileProps> = ({ title }) => {
  const [admin, setAdmin] = useState<User | null>(null);

  const fetchAdmin = async () => {
    const userId = Number(localStorage.getItem("user_id"));
    const token = localStorage.getItem("token");

    if (userId && token) {
      try {
        const response = await axios.get<User>(`http://localhost:8000/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdmin(response.data);
        console.log("admin data", response.data);
      } catch (error) {
        console.error("Failed to fetch admin data", error);
      }
    }
  };

  useEffect(() => {
    fetchAdmin();
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <img
            src="https://companieslogo.com/img/orig/JSWENERGY.NS-b8b0c8f8.png?t=1731039532"
            alt="Company Logo"
            className="h-9 w-12"
          />
        </div>
        <h1 className="text-2xl font-bold tracking-wide">{title}</h1>

        {/* User Dropdown */}
        <UserAccountDropdown user={admin} />
      </div>
    </header>
  );
};

export default Headerfile;

