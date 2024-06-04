"use client";
import React, { useState } from "react";
import { CSVLink } from "react-csv";
import { ReportsInterface } from "./reportsInterface";
import DateRangePickerComp from "@/components/DateRangePickerComp";
import Pagination from "@/components/Pagination";

const ReportsTemplate: React.FC<ReportsInterface> = ({
  attendance,
  allUsers,
  currentPage,
  totalPages,
  paginate,
  totalCount,
  OnchangeData,
  formdata,
  filterName,
  setFilterName,
  handleFilterChange,
  getColorForStatus,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [dateRangeButtonText, setDateRangeButtonText] =
    useState("Select Date Range");

  const handleToggleFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  };

  const resetFilters = () => {
    setFilterName("");
    setStartDate(null);
    setEndDate(null);
    setDateRangeButtonText("Select Date Range");
  };

  const getUserNames = () => {
    return allUsers.map((user) => user.name);
  };

  const filteredAttendance = attendance?.filter((record) => {
    const matchName = !filterName || record.userName === filterName;
    const matchDate =
      !startDate ||
      !endDate ||
      (new Date(record.date) >= startDate && new Date(record.date) <= endDate);
    return matchName && matchDate;
  });

  const columns = [
    { key: "sno", label: "S NO." },
    { key: "name", label: "NAME" },
    { key: "date", label: "DATE" },
    { key: "timeIn", label: "TIME-IN" },
    { key: "timeOut", label: "TIME-OUT" },
    { key: "totalHours", label: "TOTAL-HRS" },
    { key: "status", label: "STATUS" },
  ];
  
  return (
    <>
      <div>
        <div className="flex justify-between items-center lg:py-8 md:py-4 btn-sec">
          <div>
            <h2 className="text-2xl font-medium">Attendance Report</h2>
          </div>
          <div>
            <button className="rounded-md bg-green-500 lg:px-8 lg:py-2 md:px-5 md:py-2 sm:px-3 sm:py-2 text-white hover:bg-green-400 lg:text-lg focus:outline-0">
              <CSVLink
                data={filteredAttendance.map((record) => ({
                  userName: record.userName,
                  date: record.date,
                  timeIn: record.timeIn,
                  timeOut: record.timeOut,
                  status: record.status,
                  totalHours: record.totalHours,
                }))}
                filename={"attendance_report.csv"}
              >
                Download Report
              </CSVLink>
            </button>
          </div>
        </div>
        {/*filter-sec*/}
        <div className="filter-sec lg:px-6 lg:py-6 md:py-5 md:px-5 rounded-md box-shadow lg:mt-3 md:mt-3 flex lg:gap-9 md:gap-4 sm:gap-3 items-center">
          <div className="max-w-52 grow">
            <form className="max-w-52">
              <select
                id="name"
                className="border border-gray-300 text-gray-900 text-md rounded-md block w-full lg:py-2.5 lg:px-3 md:p-2 sm:p-2 dark:placeholder-gray-400 dark:text-white focus:outline-0"
                value={filterName}
                onChange={(e) => handleFilterChange("name", e.target.value)}
              >
                <option value="">Select User </option>
                {getUserNames().map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </form>
          </div>
          <div className="flex-none">
            <label>
              <button
                name="Select Date Range"
                id="dateofbirth"
                defaultValue="Select Date Range"
                className="border-gray-300 border rounded-md lg:py-2.5 md:py-2 sm:py-2 px-3 py-2.5"
                onClick={handleToggleFilterModal}
              >
                {startDate && endDate
                  ? `${startDate.toDateString()} - ${endDate.toDateString()}`
                  : "Select Date Range"}
              </button>
            </label>
          </div>
          <div className="flex-none">
            {showFilterModal && (
              <div className="absolute top-0 left-0 h-full w-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
                <div>
                  <div className="bg-white p-4 rounded-md shadow-md ">
                    <div className="grid gap-4  mb-4">
                      <div className=" border border-black">
                        <DateRangePickerComp
                          onChange={(range: {
                            startDate: Date | null;
                            endDate: Date | null;
                          }) => {
                            setStartDate(range.startDate);
                            setEndDate(range.endDate);
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <button
                        onClick={resetFilters}
                        className="px-2 py-1 rounded bg-blue-500 hover:bg-blue-700 text-white text-xs sm:text-sm"
                      >
                        Reset Date
                      </button>
                      <button
                        className="px-2 py-1 rounded bg-red-500 hover:bg-red-700 text-white text-xs sm:text-sm"
                        onClick={handleToggleFilterModal}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/*table*/}
        <div className="lg:px-6 lg:py-6 md:py-3 md:px-5 sm:px-4 sm:py-5 rounded-md box-shadow lg:mt-7 md:mt-4 sm:mt-6 attendance-table">
          <div className="overflow-x-auto">
            {attendance.length > 0 ? (
              <table className="table-auto w-full">
                <thead className="text-lg font-semibold uppercase text-gray-800 bg-gray-50 text-left">
                  <tr>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold">S NO.</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold">NAME</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold">DATE</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold">TIME-IN</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold">TIME-OUT</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold">TOTAL-HRS</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold">STATUS</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-lg divide-y divide-gray-100">
                  {attendance.map((user, index) => (
                    <tr key={index} className="text-lg text-gray-600">
                      <td className="p-2 whitespace-nowrap">
                        <div>{index + 1}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div>{user.userName}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div>{user.date}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div>
                          {new Date(`1970-01-01T${user.timeIn}`).toLocaleString(
                            "en-US",
                            {
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            }
                          )}
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="">
                          {user.timeOut
                            ? new Date(
                                `1970-01-01T${user.timeOut}`
                              ).toLocaleString("en-US", {
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true,
                              })
                            : "--:--"}
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div>
                          {" "}
                          {user.totalHours == "0.00" ? "-" : user.totalHours}
                        </div>
                      </td>
                      <td
                        className={`p-2 whitespace-nowrap  ${getColorForStatus(
                          user.status
                        )}`}
                      >
                        <div className="text-lg">{user.status}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No attendance data available.</p>
            )}
          </div>
          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div>
              <label htmlFor="limit" className="mr-2">
                Items per page:
              </label>
              <select name="limit" id="limit"
                value={formdata.limit}
                onChange={OnchangeData}
                className="border border-gray-300 rounded-md p-1 text-sm"
                >
                  <option aria-placeholder="12">12</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                </select>
              
            </div>
            <div>
              <p className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">
                  {currentPage === 1
                    ? 1
                    : (currentPage - 1) * formdata.limit + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {currentPage === totalPages
                    ? (currentPage - 1) * formdata.limit +
                      filteredAttendance.length
                    : currentPage * formdata.limit}
                </span>{" "}
                of <span className="font-medium">{totalCount}</span> results
              </p>
            </div>
            <div>
              <select
                id="order"
                name="order"
                value={formdata.order}
                onChange={OnchangeData}
                className="border border-gray-300 rounded-md p-1 text-sm"
              >
                <option value="">Select sorting</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
            <div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={paginate}
              />
            </div>
          </div>
        </div>
        {/*table-end*/}
      </div>
    </>
  );
};

export default ReportsTemplate;
