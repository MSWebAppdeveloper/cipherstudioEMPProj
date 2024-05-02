import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import HeaderMobile from "@/components/header-mobile";
import EmployeeNavbar from "@/components/EmployeeNavbar";
import RequestComponent from "@/app/components/employee/request/page";

const leaveRequest = async () => {
   const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return (
   
      <div className=" relative  flex flex-1 flex-col ">
        <EmployeeNavbar />
        <HeaderMobile />
        <div className="h-screen flex  justify-center ">
          <RequestComponent />
        </div>
      </div>
   
  );
};

export default leaveRequest;
