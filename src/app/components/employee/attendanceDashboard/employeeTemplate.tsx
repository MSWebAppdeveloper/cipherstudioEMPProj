"use client";
import React from "react";
import { EmployeeAttendanceInterface } from "./employeeAttendanceInterface";
import CalendarWithAttendance from "@/components/CalendearWithAttendence";


const EmployeeTemplate: React.FC<EmployeeAttendanceInterface> = ({
  handleSignIn,
  handleSignOut,
  currentTime,
  shift,
  status,
  isDayInActive,
  isDayOutActive,
  formattedElapsedTime,
  handleHomeActiveHoursChange,
  homeActiveStart,
  homeActiveEnd,
  attendanceData,
}) => {
 
  return (
    <>
      
            {/*attendance--card*/}
            <div className="lg:pt-10 md:pt-10 sm:pt-10 pt-10 box-shadow attendace-card px-10 mt-5 rounded-lg">
              <div className="pb-8 max-w-sm">
                <h3 className="pt-2 flex justify-between">
                  <b>Employee</b>{" "}
                  <span className="font-bold">
                    {localStorage.getItem("name")}
                  </span>
                </h3>
                {/* <h3 className="pt-2 flex justify-between">
                  <b>Shift Type:</b> {shift}
                </h3> */}
                <h3 className="pt-2 flex justify-between">
                  <b>Current Status:</b> {status}
                </h3>
                <h3 className="pt-2 flex justify-between">
                  <b>Current Time:</b> {currentTime}
                </h3>
                <h3 className="pt-2 flex justify-between">
                  <b>Total Active Hour:</b> {formattedElapsedTime}
                </h3>
                {shift === "Hybrid" && (
                  <>
                    <div className="pt-2 flex justify-between">
                      <label htmlFor="homeActiveStart">
                        <b>Home Active Start:</b>
                      </label>
                      <input
                        type="time"
                        id="homeActiveStart"
                        value={homeActiveStart}
                        onChange={(e) =>
                          handleHomeActiveHoursChange(e, "start")
                        }
                        required
                      />
                    </div>
                    <div className="pt-2 flex justify-between">
                      <label htmlFor="homeActiveEnd">
                        <b>Home Active End:</b>
                      </label>
                      <input
                        type="time"
                        id="homeActiveEnd"
                        value={homeActiveEnd}
                        onChange={(e) => handleHomeActiveHoursChange(e, "end")}
                        required
                      />
                    </div>
                  </>
                )}
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
            <CalendarWithAttendance attendanceData={attendanceData}/>
       
    </>
  );
};

export default EmployeeTemplate;
