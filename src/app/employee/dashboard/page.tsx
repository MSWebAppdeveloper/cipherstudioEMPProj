import React from "react";
import EmployeePage from "../../components/employee/attendanceDashboard/page";
import { Metadata } from "next";

const Employee = () => {
  return (
    <>
      <EmployeePage />
    </>
  );
};

export default Employee;
export const metadata: Metadata = {
  title: "Dashboard",
};
