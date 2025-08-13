import React, { useState, useRef, useEffect } from "react";

export default function UserAccountDropdown({ user }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="User account"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        <img
    src="/useraccountt.webp"  // Replace with your actual image path
    alt="User account"
    style={{ height: 32, width: 32, objectFit: "contain" }}
  />
        
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
            width: "220px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            zIndex: 1000,
            userSelect: "none",
          }}
        >
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}
    </div>
  );
}
