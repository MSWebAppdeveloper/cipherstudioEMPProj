import React from "react";

import Navbar from "@/components/Navbar";
import SideNav from "@/components/Sidenav";
import MarginWidthWrapper from "@/components/margin-width-wrapper";
import HeaderMobile from "@/components/header-mobile";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="h-screen flex overflow-hidden ">
      <SideNav />
      <MarginWidthWrapper>
        <div className=" relative  flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Navbar />
          <HeaderMobile />
          <div className="h-screen flex  justify-center ">
            <div className="container w-full bg-white">
              <div className="container mx-auto px-4 py-4">
                <div className="grid md:grid-cols-1 gap-4">
                  <div className="text-center mt-4">
                    <div>this is Admin Dashboard</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MarginWidthWrapper>
    </div>
  );
};

export default Dashboard;
