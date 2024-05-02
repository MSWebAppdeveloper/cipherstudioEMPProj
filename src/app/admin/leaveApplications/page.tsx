import React from "react";

import Navbar from "@/components/Navbar";
import SideNav from "@/components/Sidenav";
import MarginWidthWrapper from "@/components/margin-width-wrapper";
import HeaderMobile from "@/components/header-mobile";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import LeaveApplications from "@/app/components/admin/leaveApplications/page";
const Users = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return (
    <>
      <div className="h-screen flex overflow-hidden ">
        <SideNav />
        <MarginWidthWrapper>
          <div className=" relative  flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Navbar />
            <HeaderMobile />
            <div className="h-screen flex  justify-center ">
              <LeaveApplications/>
            </div>
          </div>
        </MarginWidthWrapper>
      </div>
    </>
  );
};

export default Users;

