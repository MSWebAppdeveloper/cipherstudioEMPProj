"use client";
import React, { useState } from "react";
import EmployeeNavbar from "@/components/EmployeeNavbar";
import Sidebar from "@/components/Sidebar";

const Dashboard =  () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <div>
        <EmployeeNavbar toggleSidebar={toggleSidebar} />
        <div className="flex w-100" id="body-row">
          <Sidebar isCollapsed={isCollapsed} />
          <div className={`right-sec lg:px-8 md:px-4 sm:px-4 ${isCollapsed ? 'collapsed' : ''}`}>
             <div className="h-screen flex  justify-center ">
            <div className="container w-full bg-white">
              <div className="container mx-auto px-4 py-4">
                <div className="grid md:grid-cols-1 gap-4">
                  <div className="text-center mt-4">
                    <div>this is Admin Dashboard</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
