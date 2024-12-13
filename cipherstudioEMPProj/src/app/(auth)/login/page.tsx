import React, { useState } from "react";
import SignIn from "./signIn/page";
import { Metadata } from "next";

const Login = () => {
  return (
    <>
      <SignIn />
    </>
  );
};

export default Login;

export const metadata: Metadata = {
    title: "Login",
  };