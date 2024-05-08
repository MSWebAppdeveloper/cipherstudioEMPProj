import React from "react";
import EmployeePage from "../../components/employee/attendanceDashboard/page";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import HeaderMobile from "@/components/header-mobile";
import MarginWidthWrapper from "@/components/margin-width-wrapper";
import EmployeeNavbar from "@/components/EmployeeNavbar";

const Employee = async () => {
   const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return (
   
    
     
          <EmployeePage />
     
   
  );
};

export default Employee;
