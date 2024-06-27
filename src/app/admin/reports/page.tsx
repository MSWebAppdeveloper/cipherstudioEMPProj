import Reports from "@/app/components/admin/reports/page";
import { Metadata } from "next";
import React, { useState } from "react";

const Report = () => {
  return (
    <>
      <Reports />
    </>
  );
};

export default Report;

export const metadata: Metadata = {
  title: "Reports",
};
