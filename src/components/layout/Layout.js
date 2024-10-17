import React from "react";
import SideNavigation from "./SideNavigation";
import TopNavigation from "./TopNavigation";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <SideNavigation />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavigation />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
