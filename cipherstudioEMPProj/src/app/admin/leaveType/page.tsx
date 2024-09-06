import LeaveTypeComponent from "@/app/components/admin/leaveType/page";
import { Metadata } from "next";

import React from "react";

const LeaveType = () => {
  return (
    <>
      <LeaveTypeComponent />
    </>
  );
};

export default LeaveType;

export const metadata: Metadata = {
  title: "Leave Types",
};
