import React from "react";

import UserComponent from "@/app/components/admin/user/page";
import { Metadata } from "next";
const Users = () => {
  return (
    <>
      <UserComponent />
    </>
  );
};

export default Users;

export const metadata: Metadata = {
  title: "Users",
};
