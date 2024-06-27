"use client";
import React, { useEffect, useState } from "react";
import EmployeeNavbar from "@/components/EmployeeNavbar";
import Sidebar from "@/components/Sidebar";

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Effect to handle screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 991) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    // Set initial state based on screen size
    handleResize();

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <div>
      <EmployeeNavbar toggleSidebar={toggleSidebar} />
      <div className="flex w-100" id="body-row">
        <Sidebar isCollapsed={isCollapsed} />
        <div
          className={`right-sec lg:px-8 md:px-4 sm:px-4 ${
            isCollapsed ? "collapsed" : ""
          }`}
        >
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
