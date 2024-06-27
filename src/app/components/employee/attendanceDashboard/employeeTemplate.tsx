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
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeTemplate;
