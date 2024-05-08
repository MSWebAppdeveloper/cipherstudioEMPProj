import React from "react";
import EmployeePage from "../../components/employee/attendanceDashboard/page";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

import EmployeeNavbar from "@/components/EmployeeNavbar";
import Sidebar from "@/components/Sidebar";

const Employee = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return (


    <div className="Wrapper">
      <EmployeeNavbar />
      <div className="flex w-100 second-sec">
        <Sidebar />
        <div className="right-sec-2 lg:px-8 md:px-4 sm:px-4">
          <EmployeePage />
        </div>
      </div>
    </div>

  );
};

export default Employee;
