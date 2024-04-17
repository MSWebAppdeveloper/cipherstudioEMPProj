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
    <div className="w-full max-w-4xl mx-auto px-4 py-2">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center pb-4">
          <h1 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-0">
            Attendance
          </h1>
          <div className="flex items-center">
            <span className="text-gray-500 mr-2">
              <span> Employee:</span>{" "}
              <span className="font-bold">{localStorage.getItem("name")}</span>
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white shadow-md rounded px-4 py-4">
            <h3 className="text-sm sm:text-base font-bold text-gray-800 mb-2">
              Current Status : <span className=" text-sm">{status}</span>
            </h3>
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-500 text-xs sm:text-sm">
                Current Time: {currentTime}
              </p>
            </div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-500 text-xs sm:text-sm">
                Total Active Hours :{/* {formatTime(totalRecordTime)}{" "} */}
                {formattedElapsedTime}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 mb-4">
              {/* Day In Button */}
              <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs sm:text-sm ${
                  isDayInActive ? "" : "opacity-50 cursor-not-allowed"
                }`}
                onClick={(e) => {
                  handleSignIn(e);
                }}
                disabled={!isDayInActive}
              >
                Day In
              </button>

              {/* Day Out Button */}
              <button
                className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-xs sm:text-sm ${
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
    </div>
  );
};

export default EmployeeTemplate;
