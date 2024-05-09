"use client"
import React, { useState } from "react";
import { CSVLink } from "react-csv";
import { ReportsInterface } from "./reportsInterface";
import { Icon } from "@iconify/react";
import DateRangePickerComp from "@/components/DateRangePickerComp";

const ReportsTemplate: React.FC<ReportsInterface> = ({ attendance, allUsers }) => {
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

  const filteredAttendance = attendance.filter((record) => {
    const matchName = !filterName || record.userName === filterName;
    const matchDate =
      !startDate ||
      !endDate ||
      (new Date(record.date) >= startDate && new Date(record.date) <= endDate);
    return matchName && matchDate;
  });

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
              <select id="countries" className="border border-gray-300 text-gray-900 text-lg rounded-md block w-full lg:p-3 md:p-2 sm:p-2 dark:placeholder-gray-400 dark:text-white focus:outline-0"
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
              <button name="Select Date Range" id="dateofbirth" defaultValue="Select Date Range" className="border-gray-300 border rounded-md lg:py-2.5" onClick={handleToggleFilterModal} >
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
            {filteredAttendance.length > 0 ? (
              <table className="table-auto w-full">
                <thead className="text-lg font-semibold uppercase text-gray-800 bg-gray-50">
                  <tr>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">S NO.</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">NAME</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">DATE</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">TIME-IN</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">TIME-OUT</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">TOTAL-HRS</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">STATUS</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-lg divide-y divide-gray-100">
                  {filteredAttendance
                    .slice() // Create a copy of the array to avoid mutating the original
                    .sort((a, b) => {
                      // Convert dates to Date objects
                      const dateA: any = new Date(a.date);
                      const dateB: any = new Date(b.date);

                      // If dates are equal, compare timeIn
                      if (dateA.getTime() === dateB.getTime()) {
                        // Convert timeIn to time
                        const timeInA = new Date(`1970-01-01T${a.timeIn}`);
                        const timeInB = new Date(`1970-01-01T${b.timeIn}`);
                        // Subtract timeInB from timeInA for descending order
                        return timeInB.getTime() - timeInA.getTime();
                      }

                      // Subtract dateB from dateA for descending order
                      return dateB - dateA;
                    }).map((user, index) => (
                      <tr key={index}>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-lg text-gray-600">{index + 1}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left text-lg text-gray-600">{user.userName}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left text-lg text-gray-600">{user.date}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-lg text-center text-gray-600">{new Date(`1970-01-01T${user.timeIn}`).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-lg text-center text-gray-600">{user.timeOut ?
                            new Date(`1970-01-01T${user.timeOut}`).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
                            :
                            "--:--"
                          }</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-lg text-center text-gray-600">  {user.totalHours == "0.00" ? "-" : user.totalHours}</div>
                        </td>
                        <td className={`p-2 whitespace-nowrap  ${getColorForStatus(user.status)}`}>
                          <div className="text-lg text-center ">
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
          {/*pagination*/}
          <div className="py-6 mt-4">
            <nav aria-label="Page navigation example">
              <ul className="flex items-center -space-x-px h-8 text-sm justify-end">
                <li>
                  <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span className="sr-only">Previous</span>
                    <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 1 1 5l4 4" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                </li>
                <li>
                  <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                </li>
                <li>
                  <a href="#" aria-current="page" className="z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                </li>
                <li>
                  <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                </li>
                <li>
                  <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                </li>
                <li>
                  <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span className="sr-only">Next</span>
                    <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 9 4-4-4-4" />
                    </svg>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        {/*table-end*/}
      </div>

    </>
  );
};

export default ReportsTemplate;
