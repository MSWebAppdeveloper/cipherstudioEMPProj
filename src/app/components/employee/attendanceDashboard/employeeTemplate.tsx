"use client";
import React, { useEffect, useState } from "react";
import { EmployeeAttendanceInterface } from "./employeeAttendanceInterface";
import EmployeeNavbar from "@/components/EmployeeNavbar";
import Sidebar from "@/components/Sidebar";

const EmployeeTemplate: React.FC<EmployeeAttendanceInterface> = ({
  handleSignIn,
  handleSignOut,

  currentTime,

  status,
  isDayInActive,
  isDayOutActive,

  formattedElapsedTime,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Effect to handle screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 991) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    // Set initial state based on screen size
    handleResize();

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <>
<<<<<<< HEAD
      {/*attendance--card*/}
      <div className="lg:pt-8 md:pt-8 sm:pt-8 pt-10 box-shadow attendace-card px-10 mt-5 rounded-lg">
        <div className="pb-8 max-w-sm">
          <h3 className="pt-2 flex justify-between">
            <b>Employee</b>{" "}
            <span className="font-bold">{localStorage.getItem("name")}</span>
          </h3>
          <h3 className="pt-2 flex justify-between">
            <b>Current Status:</b> {status}
          </h3>
          <h3 className="pt-2 flex justify-between">
            <b>Current Time:</b> {currentTime}
          </h3>
          <h3 className="pt-2 flex justify-between">
            <b>Total Active Hour:</b> {formattedElapsedTime}
          </h3>
        </div>
        <div className="flex justify-between items-center py-8 border-gray-200 border-t">
          <div>
            <button
              className={`bg-blue-500 text-white shadow-md shadow-slate-300 text-md py-2 px-5 font-medium rounded-sm hover:bg-blue-600 ${
                isDayInActive ? "" : "opacity-50 cursor-not-allowed"
              }`}
              onClick={(e) => {
                handleSignIn(e);
              }}
              disabled={!isDayInActive}
            >
              Day In
            </button>
          </div>
          <div>
            <button
              className={`bg-red-500 text-white shadow-md shadow-slate-300 text-md py-2 px-5 font-medium rounded-sm hover:bg-red-600 ${
                isDayOutActive ? "" : "opacity-50 cursor-not-allowed"
              }`}
              onClick={(e) => {
                handleSignOut(e);
              }}
              disabled={!isDayOutActive}
            >
              Day Out
            </button>
=======
      <div>
        <EmployeeNavbar toggleSidebar={toggleSidebar} />
        <div className="flex w-100" id="body-row">
          <Sidebar isCollapsed={isCollapsed} />
          <div
            className={`right-sec lg:px-8 md:px-4 sm:px-4 ${
              isCollapsed ? "collapsed" : ""
            }`}
          >
            {/*attendance--card*/}
            <div className="lg:pt-10 md:pt-10 sm:pt-10 pt-10 box-shadow attendace-card px-10 mt-5 rounded-lg">
              <div className="pb-8 max-w-sm">
                <h3 className="pt-2 flex justify-between">
                  <b>Employee</b>{" "}
                  <span className="font-bold">
                    {localStorage.getItem("name")}
                  </span>
                </h3>
                <h3 className="pt-2 flex justify-between">
                  <b>Current Status:</b> {status}
                </h3>
                <h3 className="pt-2 flex justify-between">
                  <b>Current Time:</b> {currentTime}
                </h3>
                <h3 className="pt-2 flex justify-between">
                  <b>Total Active Hour:</b> {formattedElapsedTime}
                </h3>
              </div>
              <div className="flex justify-between items-center py-8 border-gray-200 border-t">
                <div>
                  <button
                    className={`bg-blue-500 text-white text-lg py-2 px-5 font-medium rounded-md hover:bg-blue-600 ${
                      isDayInActive ? "" : "opacity-50 cursor-not-allowed"
                    }`}
                    onClick={(e) => {
                      handleSignIn(e);
                    }}
                    disabled={!isDayInActive}
                  >
                    Day In
                  </button>
                </div>
                <div>
                  <button
                    className={`bg-red-500 text-white text-lg py-2 px-5 font-medium rounded-md hover:bg-red-600 ${
                      isDayOutActive ? "" : "opacity-50 cursor-not-allowed"
                    }`}
                    onClick={(e) => {
                      handleSignOut(e);
                    }}
                    disabled={!isDayOutActive}
                  >
                    Day Out
                  </button>
                </div>
              </div>
            </div>
>>>>>>> da3330fc74a7096a34f84dabd6224a8180401625
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeTemplate;
