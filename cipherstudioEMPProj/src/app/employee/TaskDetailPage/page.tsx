
import React, { useState } from "react";
import { Metadata } from "next";
import TaskDetailPage from "@/app/components/TaskDetailPage/page";

const LeaveRequest = () => {
  return (
    <>
      <TaskDetailPage />
    </>
  );
};

export default LeaveRequest;

export const metadata: Metadata = {
  title: "Task History",
};  