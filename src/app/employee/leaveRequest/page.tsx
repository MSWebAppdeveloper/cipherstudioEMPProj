"use client";
import React, { useEffect, useState } from "react";
import EmployeeNavbar from "@/components/EmployeeNavbar";
import RequestComponent from "@/app/components/employee/request/page";
import Sidebar from "@/components/Sidebar";

const LeaveRequest = () => {
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
          <RequestComponent />
        </div>
      </div>
    </div>
  );
};

export default LeaveRequest;
