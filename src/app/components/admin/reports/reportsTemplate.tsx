"use client"
import React, { useState } from "react";
import { CSVLink } from "react-csv";
import { ReportsInterface } from "./reportsInterface";
import { Icon } from "@iconify/react";
import DateRangePickerComp from "@/components/DateRangePickerComp";
import Pagination from "@/components/Pagination";

const ReportsTemplate: React.FC<ReportsInterface> = ({ attendance, allUsers, currentPage, totalPages, paginate, totalCount, OnchangeData, formdata, handleOrderChange }) => {
  const [filterName, setFilterName] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [dateRangeButtonText, setDateRangeButtonText] = useState("Select Date Range");




  const handleToggleFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  };

  const handleUserNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterName(event.target.value);
  };

  const handleDateRangeChange = (range: { startDate: Date | null; endDate: Date | null }) => {
    setStartDate(range.startDate);
    setEndDate(range.endDate);
    // Update the button text based on selected date range
    setDateRangeButtonText(
      range.startDate && range.endDate
        ? `${range.startDate.toDateString()} - ${range.endDate.toDateString()}`
        : "Select Date Range"
    );
  };

  const resetFilters = () => {
    setFilterName("");
    setStartDate(null);
    setEndDate(null);
    setDateRangeButtonText("Select Date Range")
  };

  const getUserNames = () => {
    return allUsers.map((user) => user.name);
  };

  const filteredAttendance = attendance?.filter(record => {
    const matchName = !filterName || record.userName === filterName;
    const matchDate =
      !startDate ||
      !endDate ||
      (new Date(record.date) >= startDate && new Date(record.date) <= endDate);
    return matchName && matchDate;
  });

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleOrderChange(e.target.value);
  };

  function getColorForStatus(status: string) {
    switch (status) {
      case "Active":
        return "text-green-500";
      case "Absent":
        return "text-red-500"; // Red for Absent
      case "Leave":
        return "text-orange-500"; // Orange for Leave
      case "Leave (Half Day)":
        return "text-lightcoral"; // Lighter orange for Half Day Leave
      case "Short Leave":
        return "text-violet-500"; // Violet for Short Leave
      case "Full Day":
        return "text-yellow-500"; // Green for Present
      case "Present(forget dayout)":
        return "text-yellow-500"; // Lighter green for Present (Extra Hours)
      default:
        return ""; // No color for unknown status
    }
  }

  // Pagination
  const indexOfLastItem = currentPage * formdata.limit;
  const indexOfFirstItem = indexOfLastItem - formdata.limit;
  const currentItems = filteredAttendance.slice(indexOfFirstItem, indexOfLastItem);


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
                data={filteredAttendance.map(record => ({
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
              <select id="countries" className="border border-gray-300 text-gray-900 text-md rounded-md block w-full lg:py-2.5 lg:px-3 md:p-2 sm:p-2 dark:placeholder-gray-400 dark:text-white focus:outline-0"
                value={filterName}
                onChange={handleUserNameChange}
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
              <button name="Select Date Range" id="dateofbirth" defaultValue="Select Date Range" className="border-gray-300 border rounded-md lg:py-2.5 md:py-2 sm:py-2 px-3 py-2.5" onClick={handleToggleFilterModal} >
                {dateRangeButtonText}
              </button>
            </label>
          </div>
          <div className="flex-none">
            <button className="lg:px-6 lg:py-2 md:px-3 md:py-2 sm:py-2 sm:px-2 text-white text-md rounded-md btn-3 focus:outline-0">
              Filter
            </button>
          </div>
        </div>
        {showFilterModal && (
          <div className="absolute top-0 left-0 h-full w-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-md shadow-md">
              <div className="grid gap-4  mb-4">
                <div className=" border border-black">
                  <DateRangePickerComp onChange={handleDateRangeChange} />
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={resetFilters}
                  className="px-2 py-1 rounded bg-blue-500 hover:bg-blue-700 text-white text-xs sm:text-sm"
                >
                  Reset Date
                </button>
                <button className="px-2 py-1 rounded bg-red-500 hover:bg-red-700 text-white text-xs sm:text-sm"
                  onClick={handleToggleFilterModal}>Close</button>
              </div>
            </div>
          </div>
        )}
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
                  {attendance
                    // .slice() // Create a copy of the array to avoid mutating the original
                    // .sort((a, b) => {
                    //   // Convert dates to Date objects
                    //   const dateA: any = new Date(a.date);
                    //   const dateB: any = new Date(b.date);

                    //   // If dates are equal, compare timeIn
                    //   if (dateA.getTime() === dateB.getTime()) {
                    //     // Convert timeIn to time
                    //     const timeInA = new Date(`1970-01-01T${a.timeIn}`);
                    //     const timeInB = new Date(`1970-01-01T${b.timeIn}`);
                    //     // Subtract timeInB from timeInA for descending order
                    //     return timeInB.getTime() - timeInA.getTime();
                    //   }

                    //   // Subtract dateB from dateA for descending order
                    //   return dateB - dateA;
                    // })
                    .map((user, index) => (
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
                          <div>{new Date(`1970-01-01T${user.timeIn}`).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="">{user.timeOut ?
                            new Date(`1970-01-01T${user.timeOut}`).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
                            :
                            "--:--"
                          }</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div>  {user.totalHours == "0.00" ? "-" : user.totalHours}</div>
                        </td>
                        <td className={`p-2 whitespace-nowrap  ${getColorForStatus(user.status)}`}>
                          <div className="text-lg">
                            {user.status}
                          </div>
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
              <input
                id="limit"
                type="number"
                min="1"
                value={formdata.limit}
                onChange={OnchangeData}
                className="border border-gray-300 rounded-md p-1 text-sm"
                name="limit"

              />
            </div>
            <div>
              <p className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">
                  {currentPage === 1 ? 1 : (currentPage - 1) * formdata.limit + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {currentPage === totalPages
                    ? (currentPage - 1) * formdata.limit + filteredAttendance.length
                    : currentPage * formdata.limit}
                </span>{" "}
                of{" "}
                <span className="font-medium">{totalCount}</span> results
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
