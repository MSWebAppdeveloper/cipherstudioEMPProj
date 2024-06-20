"use client"
import React, { useState } from "react";
import EmployeePage from "../../components/employee/attendanceDashboard/page";
import EmployeeNavbar from "@/components/EmployeeNavbar";
import Sidebar from "@/components/Sidebar";

const Employee = () => {
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
          <EmployeePage />
        </div>
      </div>
    </div>

  );
};

export default Employee;
