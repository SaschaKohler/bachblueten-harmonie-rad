import React from "react";
import { Link } from "react-router-dom";

const navItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    name: "Bachblüten-Rad",
    path: "/bachbluten-rad",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  // Füge hier weitere Navigationseinträge hinzu
];

const SideNavigation = () => {
  return (
    <nav className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>
      <ul>
        {navItems.map((item) => (
          <li key={item.name} className="mb-2">
            <Link
              to={item.path}
              className="flex items-center p-2 hover:bg-gray-700 rounded"
            >
              <svg
                className="w-6 h-6 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={item.icon}
                />
              </svg>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideNavigation;
