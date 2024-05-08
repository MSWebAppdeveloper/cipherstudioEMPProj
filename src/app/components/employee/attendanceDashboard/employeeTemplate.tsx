"use client";
import React, { useEffect, useState } from "react";
import { employeeAttendanceInterface } from "./employeeAttendanceInterface";

const EmployeeTemplate: React.FC<employeeAttendanceInterface> = ({
  handleSignIn,
  handleSignOut,

  currentTime,

  status,
  isDayInActive,
  isDayOutActive,

  formattedElapsedTime,
}) => {
  return (
    <>
  
    <div className="right-sec-2 lg:px-8 md:px-4 sm:px-4">
    <div className="py-8">
      <div>
        <h2 className="lg:text-2xl md:text-2xl sm:text-lg font-medium">
          Attendance
        </h2>
      </div>
    </div>
    {/*attendance--card*/}
    <div className="lg:pt-10 md:pt-10 sm:pt-10 pt-10 box-shadow attendace-card px-10 mt-5 rounded-lg">
      <div className="pb-8 max-w-sm">
        <h3 className="pt-2 flex justify-between">
          <b>Employee</b>  <span className="font-bold">{localStorage.getItem("name")}</span>
        </h3>
        <h3 className="pt-2 flex justify-between">
          <b>Current Status:</b> {status}
        </h3>
        <h3 className="pt-2 flex justify-between">
          <b>Current Time:</b>  {currentTime}
        </h3>
        <h3 className="pt-2 flex justify-between">
          <b>Total Active Hour:</b>  {formattedElapsedTime}
        </h3>
      </div>
      <div className="flex justify-between items-center py-8 border-gray-200 border-t">
        <div>
          <button className={`bg-blue-500 text-white text-lg py-2 px-5 font-medium rounded-md hover:bg-blue-600 ${
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
          <button className={`bg-red-500 text-white text-lg py-2 px-5 font-medium rounded-md hover:bg-red-600 ${
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
  </div>
  </>
  );
};

export default EmployeeTemplate;
