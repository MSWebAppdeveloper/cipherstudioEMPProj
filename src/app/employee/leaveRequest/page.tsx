import React, { useState } from "react";

import LeaveRequestComponent from "@/app/components/employee/leaverequest/page";
import { Metadata } from "next";

const LeaveRequest = () => {
  return (
    <>
      <LeaveRequestComponent />
    </>
  );
};

export default LeaveRequest;

export const metadata: Metadata = {
  title: "Leave Request",
};