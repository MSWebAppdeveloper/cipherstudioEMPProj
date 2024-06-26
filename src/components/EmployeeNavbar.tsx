"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";

interface NavbarProps {
  toggleSidebar: () => void;
}
const EmployeeNavbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <div className="bg-slate-50 w-100 px-4 py-2 border-b border-slate-300 h-20 flex justify-between items-center header sticky">
      <div className="logo flex">
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
        <button
          id="toggle-sidebar"
          className="text-gray-500 hover:text-gray-700 focus:outline-none ml-4"
          onClick={toggleSidebar}
        >
          <Icon id="collapse-icon" icon="fa:bars" width="20" height="20" />
        </button>
      </div>
    </div>
  );
};

export default EmployeeNavbar;
