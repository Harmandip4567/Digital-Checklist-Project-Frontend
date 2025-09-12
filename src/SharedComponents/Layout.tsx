import React, { useState, ReactNode } from "react";
import SidebarAdmin from "./SidebarAdmin";
import SideBarMaintainer from "./SideBarMaintainer";
import { FiMenu } from "react-icons/fi"; // Menu Icon
import { HandleClickOutside } from "../CustomHooks/HandleClickOutside";

// Define props interface
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  // To handle clicking outside, use custom hook that returns a ref
  const clickOutsideSideBar = HandleClickOutside(() => setIsOpen(false));

  const role = localStorage.getItem("role");

  return (
    <div className="h-screen max-w-full">
      {/* Top menu button */}
      <div className="m-5 p-2 flex items-center justify-start bg-gray-50 fixed top-10 left-1 z-50 rounded-lg shadow-md">
        <button
          onClick={toggleSidebar}
          className="text-2xl text-gray-700 hover:text-gray-900"
        >
          <FiMenu />
        </button>
      </div>

      <div className="flex flex-1 relative">
        {/* Sidebar */}
        {isOpen && (
          <div ref={clickOutsideSideBar} className="fixed left-0 top-0 bottom-0 z-50">
            {role === "Admin" ? <SidebarAdmin /> : <SideBarMaintainer />}
          </div>
        )}

        {/* Main content */}
        <div
          className={`flex-1 transition-all duration-300 p-5 ${
            isOpen ? "ml-64" : "ml-0"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;

