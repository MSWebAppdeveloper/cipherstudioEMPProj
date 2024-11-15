"use client"
import React from "react";

import { Icon } from "@iconify/react";

import { SideNavItem } from "./types";


export const SIDENAV_ITEMS: SideNavItem[] = [

  {
    title: "Reports",
    path: "/admin/reports",
    icon: <Icon icon="lucide:clipboard-minus" width="20" height="20"  style={{color: "#1565e5"}} />,
  },
  {
    title: "Add Users",
    path: "/admin/users",
    icon: <Icon icon="lucide:user" width="20" height="20"  style={{color: "#1565e5"}} />,
  },
  {
    title: "Leave Application",
    path: "/admin/leaveApplications",
    icon:<Icon icon="mdi:application-edit-outline" width="20" height="20" style={{color: "#1565e5"}} />
    // icon: <Icon icon="cil:applications" width="20" height="20"  , />,
  },
  {
    title: "Leave Types",
    path: "/admin/leaveType",
    icon:<Icon icon="iconoir:plug-type-l"  width="20" height="20" style={{color: "#1565e5"}}/>
  },
  {
    title: "Tasks",
    path: "/admin/tasks",
    icon: <Icon icon="cil:task"  width="20" height="20"   style={{color: "#1565e5"}} />,
  },
  {
    title: "Projects",
    path: "/admin/projects",
    icon: <Icon icon="grommet-icons:projects"  width="20" height="20"   style={{color: "#1565e5"}} />,
  },
  {
    title: "Dashboard",
    path: "/employee/dashboard",
    icon: <Icon icon="material-symbols:dashboard-outline" width="20" height="20"  style={{color: "#1565e5"}} />,
  },
  {
    title: "Leave Request",
    path: "/employee/leaveRequest",
    icon: <Icon icon="carbon:request-quote" width="20" height="20"   style={{color: "#1565e5"}} />,
  },
  {
    title: "Tasks",
    path: "/employee/tasks",
    icon: <Icon icon="cil:task"  width="20" height="20"   style={{color: "#1565e5"}} />,
  },
  {
    title: "Rules For Calendar",
    path: "/employee/rulesForCalendar",
    icon: <Icon icon="oi:calendar"  width="20" height="20"   style={{color: "#1565e5"}} />,
  },
];