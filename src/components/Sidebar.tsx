"use client";

import React, { useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SIDENAV_ITEMS } from "@/constants";
import { SideNavItem } from "@/types";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook, faUser } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
    return (
        <div className="left-sidebar px-2 py-12 fixed text-gray-300 border border-r leave-cards">
        <ul className="font-regular">
          <li >
            <Link href="/employee/dashboard" className="lg:flex md:flex items-center h-10 lg:px-3 md:px-1 rounded-md focus:outline-none text-gray-900 lg:text-md md:text-md lg:py-3 md:py-3 sm:py-2 hover:bg-blue-400 hover:text-white">
            <FontAwesomeIcon icon={faAddressBook} />
              <span className="lg:ml-4 md:ml-2">Dashboard</span>
            </Link>
          </li>
          <li className="mt-3">
            <Link href="/employee/leaveRequest" className="lg:flex md:flex items-center h-10 lg:px-3 md:px-1 rounded-md focus:outline-none text-gray-900 lg:text-md md:text-md lg:py-3 md:py-3 sm:py-2 hover:bg-blue-400 hover:text-white">
            <FontAwesomeIcon icon={faUser} />
              <span className="lg:ml-4 md:ml-2">Leave Request</span>
            </Link>
          </li>
        </ul>
      </div>
      

    );
};

export default Sidebar;

// const MenuItem = ({ item }: { item: SideNavItem }) => {
//     const pathname = usePathname();
//     const [subMenuOpen, setSubMenuOpen] = useState(false);
//     const toggleSubMenu = () => {
//         setSubMenuOpen(!subMenuOpen);
//     };

//     return (
//         <div className="">
//             {item.submenu ? (
//                 <>
//                     <button
//                         onClick={toggleSubMenu}
//                         className={`flex flex-row items-center p-2 rounded-lg hover-bg-zinc-100 w-full justify-between hover:bg-zinc-100 ${pathname.includes(item.path) ? "bg-zinc-100" : ""
//                             }`}
//                     >
//                         <div className="flex flex-row space-x-4 items-center">
//                             {item.icon}
//                             <span className="font-semibold text-xl  flex">{item.title}</span>
//                         </div>

//                         <div className={`${subMenuOpen ? "rotate-180" : ""} flex`}>
//                             <Icon icon="lucide:chevron-down" width="24" height="24" />
//                         </div>
//                     </button>

//                     {subMenuOpen && (
//                         <div className="my-2 ml-12 flex flex-col space-y-4">
//                             {item.subMenuItems?.map((subItem, idx) => {
//                                 return (
//                                     <Link
//                                         key={idx}
//                                         href={subItem.path}
//                                         className={`${subItem.path === pathname ? "font-bold" : ""
//                                             }`}
//                                     >
//                                         <span>{subItem.title}</span>
//                                     </Link>
//                                 );
//                             })}
//                         </div>
//                     )}
//                 </>
//             ) : (
//                 <Link
//                     href={item.path}
//                     className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-zinc-100 ${item.path === pathname ? "bg-zinc-100" : ""
//                         }`}
//                 >
//                     {item.icon}
//                     <span className="font-semibold text-xl flex">{item.title}</span>
//                 </Link>
//             )}
//         </div>
//     );
// };
