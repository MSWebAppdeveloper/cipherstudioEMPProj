
import React, { useState } from "react";
import { Metadata } from "next";
import TaskHistoryPage from "@/app/components/TaskHistoryPage/page";

const LeaveRequest = () => {
  return (
    <>
      <TaskHistoryPage />
    </>
  );
};

export default LeaveRequest;

export const metadata: Metadata = {
  title: "Task History",
};  