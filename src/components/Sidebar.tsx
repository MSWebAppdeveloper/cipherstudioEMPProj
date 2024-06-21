"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDENAV_ITEMS } from "@/constants";
import { SideNavItem } from "@/types";
import { Icon } from "@iconify/react";
import SignoutButton from "./SignOutButton";

interface SidebarProps {
  isCollapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
  const [filteredItems, setFilteredItems] = useState<SideNavItem[]>([]);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    const items = SIDENAV_ITEMS.filter((item) => {
      if (userRole === "Employee") {
        return item.path.startsWith("/employee");
      } else if (userRole === "Management") {
        return item.path.startsWith("/admin");
      } else {
        return true; // Show all items for other roles or no role
      }
    });
    setFilteredItems(items);
  }, []);

  return (
    <div
      id="sidebar-container"
      className={`px-2 py-5 fixed border border-r leave-cards shadow-lg  ${isCollapsed ? "sidebar-collapsed" : "sidebar-expanded"
        }`}
    >
      <div className="flex flex-col justify-between space-y-6 w-full sidebar-menu">
        <div className="flex flex-col space-y-2 md:px-1 lg:px-2 sm:px-0 menu-collapsed">
          {filteredItems.map((item, idx) => (
            <MenuItem key={idx} item={item} isCollapsed={isCollapsed} />
          ))}
        </div>
        <div>
            <ul>
              <li className="relative no-underline menu-collapsed">
             <SignoutButton/>
              </li>
            </ul>
          </div>
      </div>
    </div>
  );
};

const MenuItem = ({
  item,
  isCollapsed,
}: {
  item: SideNavItem;
  isCollapsed: boolean;
}) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className="">
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`menu-item ${isCollapsed ? "collapsed" : ""}  flex flex-row items-center p-2 rounded-lg hover-bg-zinc-100 w-full justify-between hover:bg-zinc-100 ${pathname.includes(item.path) ? "" : ""
              }`}
          >
            <div className="flex flex-row space-x-4 items-center">
              {item.icon && (
                <div className="icon">{item.icon}</div>
              )}
              <span
                className={`font-semibold text-xl flex `}
              >
                {item.title}
              </span>
            </div>

            <div className={`${subMenuOpen ? "rotate-180" : ""} flex`}>
              <Icon icon="lucide:chevron-down" width="24" height="24" />
            </div>
          </button>

          {subMenuOpen && !isCollapsed && (
            <div className="my-2 ml-12 flex flex-col space-y-4">
              {item.subMenuItems?.map((subItem, idx) => (
                <Link
                  key={idx}
                  href={subItem.path}
                  className={` ${subItem.path === pathname ? "font-bold" : ""}`}
                >
                  <span className=" ">{subItem.title}</span>
                </Link>
              ))}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`menu-item ${isCollapsed ? "collapsed" : ""} flex flex-row space-x-2 items-center p-2 rounded-lg hover:bg-zinc-100 ${item.path === pathname ? "" : ""
            }`}
        >
          {item.icon && (
            <div className="icon">{item.icon}</div>
          )}
          <span
            className={`font-medium text-sm flex `}
          >
            {item.title}
          </span>
        </Link>
      )}
    </div>
  );
};


export default Sidebar;
