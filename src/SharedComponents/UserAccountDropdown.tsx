import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { HandleClickOutside } from "../CustomHooks/HandleClickOutside";

// Define TypeScript interface for user prop
interface User {
  username: string;
  role: string;
  email: string;
}

interface UserAccountDropdownProps {
  user: User | null;
}

const UserAccountDropdown: React.FC<UserAccountDropdownProps> = ({ user }) => {
  const [open, setOpen] = useState<boolean>(false);

  // Handles clicking outside the dropdown
  const dropdownRef = HandleClickOutside(() => setOpen(false));

  if (!user) return null; // optional: render nothing if user is null

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="User account"
        className="p-1 rounded-full hover:bg-blue-500 transition cursor-pointer"
      >
        <FaUserCircle className="text-2xl" />
      </button>

      {open && (
        <div
          ref={dropdownRef}
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "10px",
            marginTop: "5px",
            width: "320px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            zIndex: 1000,
            userSelect: "none",
          }}
        >
          <p className="text-blue-600">
            <strong>Username:</strong> {user.username}
          </p>
          <p className="text-blue-600">
            <strong>Role:</strong> {user.role}
          </p>
          <p className="text-blue-600">
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserAccountDropdown;
