import { Icon } from "@iconify/react";

import { SideNavItem } from "./types";

export const SIDENAV_ITEMS: SideNavItem[] = [
 
  {
    title: "Attendance",
    path: "/admin/reports",
    icon: <Icon icon="lucide:clipboard-minus" width="24" height="24" />,
  },
  {
    title: "Add Users",
    path: "/admin/users",
    icon: <Icon icon="lucide:user" width="24" height="24" />,
  },
];
