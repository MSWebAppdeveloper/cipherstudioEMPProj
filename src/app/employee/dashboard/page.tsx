<<<<<<< HEAD
"use client";
import React, { useState, useEffect } from "react";
=======
import React from "react";
>>>>>>> da3330fc74a7096a34f84dabd6224a8180401625
import EmployeePage from "../../components/employee/attendanceDashboard/page";
import { Metadata } from "next";

const Employee = () => {
<<<<<<< HEAD
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
      <div className={`flex w-100`} id="body-row">
        <Sidebar isCollapsed={isCollapsed} />
        <div
          className={`right-sec lg:px-8 md:px-4 sm:px-4 ${
            isCollapsed ? "collapsed" : ""
          }`}
        >
          <EmployeePage />
        </div>
      </div>
    </div>
=======
  return (
    <>
      <EmployeePage />
    </>
>>>>>>> da3330fc74a7096a34f84dabd6224a8180401625
  );
};

export default Employee;
export const metadata: Metadata = {
  title: "Dashboard",
};
