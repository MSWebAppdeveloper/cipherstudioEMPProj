import React, { useState } from "react";
import LeaveApplications from "@/app/components/admin/leaveApplications/page";
import { Metadata } from "next";

const Users = () => {
  return (
    <>
      <LeaveApplications />
    </>
  );
};

export default Users;

export const metadata: Metadata = {
  title: "Leave Applications",
};
