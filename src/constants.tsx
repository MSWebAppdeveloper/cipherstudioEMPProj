"use client"
import React from "react";

import { Icon } from "@iconify/react";

import { SideNavItem } from "./types";


export const SIDENAV_ITEMS: SideNavItem[] = [

  {
    title: "Reports",
    path: "/admin/reports",
    icon: <Icon icon="lucide:clipboard-minus" width="24" height="24" />,
  },
  {
    title: "Add Users",
    path: "/admin/users",
    icon: <Icon icon="lucide:user" width="24" height="24" />,
  },
  {
    title: "Leaves",
    path: "/admin/leaveApplications",
    icon: <Icon icon="cil:applications" width="24" height="24" />,
  },
  {
    title: "Dashboard",
    path: "/employee/dashboard",
    icon: <Icon icon="material-symbols:dashboard-outline" width="24" height="24" />,
  },
  {
    title: "Leave Request",
    path: "/employee/leaveRequest",
    icon: <Icon icon="carbon:request-quote" width="24" height="24" />,
  },
];