import UserTableComponent from "@/app/components/admin/table/page";
import React from "react";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Sidebar from "@/components/Sidebar";
import EmployeeNavbar from "@/components/EmployeeNavbar";
const Users = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return (
    <>
      <div className="Wrapper">
        <EmployeeNavbar />
        <div className="flex w-100 second-sec">
          <Sidebar />
          <div className="right-sec-2 lg:px-8 md:px-4 sm:px-4">
            <UserTableComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
