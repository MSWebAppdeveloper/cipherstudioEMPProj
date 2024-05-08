import Reports from "@/app/components/admin/reports/page";
import React from "react";
import Navbar from "@/components/Navbar";
import SideNav from "@/components/Sidenav";
import MarginWidthWrapper from "@/components/margin-width-wrapper";
import HeaderMobile from "@/components/header-mobile";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import EmployeeNavbar from "@/components/EmployeeNavbar";
import Sidebar from "@/components/Sidebar";
const Report = async () => {
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
            <Reports />
          </div>
        </div>
      </div>
    </>
  );
};

export default Report;
