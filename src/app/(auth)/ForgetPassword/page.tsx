import React, { useState } from "react";

import { Metadata } from "next";
import ForgetPasswordComponent from "./ForgetPassword/page";

const ForgetPassword = () => {
  return (
    <>
      <ForgetPasswordComponent />
    </>
  );
};

export default ForgetPassword;

export const metadata: Metadata = {
    title: "ForgetPassword",
  };