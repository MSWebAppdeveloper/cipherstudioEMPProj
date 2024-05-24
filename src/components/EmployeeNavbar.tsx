"use client";

import React from "react";
import Link from "next/link";

import SignoutButton from "./SignOutButton";
import Image from "next/image";

const EmployeeNavbar = () => {
  return (
    <div className="bg-slate-50 w-100 px-4 py-2 border-b border-slate-300 h-20 flex justify-between items-center header sticky">
      <div className="logo">
        <Link href="/employee/dashboard">
          <Image
            width="192"
            height="100"
            src="/cipher-1.png"
            alt="logo-img"
            className=" header-logo"
            priority={true}
            quality={100}
          />
        </Link>
      </div>
      <div className="flex justify-between items-center">
        <button className=" bg-gray-200 rounded-md hover:bg-gray-300">
          <span className="font-semibold text-sm">
            <SignoutButton />
          </span>
        </button>
      </div>
    </div>
    // </div>
  );
};

export default EmployeeNavbar;
