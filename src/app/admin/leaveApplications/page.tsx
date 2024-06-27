<<<<<<< HEAD
"use client";
import React, { useEffect, useState } from "react";
import LeaveApplications from "@/app/components/admin/leaveApplications/page";
import EmployeeNavbar from "@/components/EmployeeNavbar";
import Sidebar from "@/components/Sidebar";
const Users = () => {
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
    <>
      <div>
        <EmployeeNavbar toggleSidebar={toggleSidebar} />
        <div className="flex w-100" id="body-row">
          <Sidebar isCollapsed={isCollapsed} />
          <div
            className={`right-sec lg:px-8 md:px-4 sm:px-4 ${
              isCollapsed ? "collapsed" : ""
            }`}
          >
            <LeaveApplications />
          </div>
        </div>
      </div>
=======
import React, { useState } from "react";
import LeaveApplications from "@/app/components/admin/leaveApplications/page";
import { Metadata } from "next";

const Users = () => {
  return (
    <>
      <LeaveApplications />
>>>>>>> da3330fc74a7096a34f84dabd6224a8180401625
    </>
  );
};

export default Users;
<<<<<<< HEAD
=======

export const metadata: Metadata = {
  title: "Leave Applications",
};
>>>>>>> da3330fc74a7096a34f84dabd6224a8180401625
