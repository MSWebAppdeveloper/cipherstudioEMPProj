import DateRangePickerComp from "@/components/DateRangePickerComp";
import React, { useState } from "react";
import { CSVLink } from "react-csv";
import { ReportsInterface } from "./reportsInterface";
import { Icon } from "@iconify/react";

const ReportsTemplate: React.FC<ReportsInterface> = ({ attendance, allUsers }) => {
  const [filterName, setFilterName] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleToggleFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  };

  const handleUserNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterName(event.target.value);
  };

  const handleDateRangeChange = (range: { startDate: Date | null; endDate: Date | null }) => {
    setStartDate(range.startDate);
    setEndDate(range.endDate);
  };

  const resetFilters = () => {
    setFilterName("");
    setStartDate(null);
    setEndDate(null);
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
        return "text-yellow-500";
      case "Absent":
        return "text-red-500"; // Red for Absent
      case "Leave":
        return "text-orange-500"; // Orange for Leave
      case "Leave (Half Day)":
        return "text-lightcoral"; // Lighter orange for Half Day Leave
      case "Short Leave":
        return "text-violet-500"; // Violet for Short Leave
      case "Present":
        return "text-green-500"; // Green for Present
      case "Present (Extra Hours)":
        return "text-blue-500"; // Lighter green for Present (Extra Hours)
      default:
        return ""; // No color for unknown status
    }
  }

  return (
    <div className="container w-full bg-white overflow-x-auto">
      <div className="container mx-auto px-4 py-4">
        <div className="grid md:grid-cols-1 gap-4">
          <div className="bg-white shadow-md rounded px-4 py-4">
            <div className="flex justify-between items-center pb-2">
              <div className="flex gap-2 flex-wrap">
                <h3 className="text-base font-bold text-gray-800 mb-2">
                  Attendance Report
                </h3>
              </div>

              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs sm:text-sm">
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

            <button
              onClick={handleToggleFilterModal}
              className={`px-2 py-1 m-2 sm:px-4 sm:py-2 rounded bg-blue-500 hover:bg-blue-700 text-white text-xs sm:text-sm`}
            >
              Filter
            </button>
            {showFilterModal && (
              <div className="absolute top-0 left-0 h-full w-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-4 rounded-md shadow-md">
                  <div className="flex justify-between mb-2">
                    <h3 className="text-lg font-semibold">Filter Options</h3>
                    <button
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold  rounded m-2 sm:w-auto md:w-auto" // Adjust button size for small and medium screens
                    >
                      <Icon icon="material-symbols-light:cancel-outline" width="2em" height="2em" className=" hover:from-fuchsia-100 cursor-pointer" onClick={handleToggleFilterModal} />
                    </button>
                  </div>
                  <div className="grid gap-4  mb-4">
                    <div className="flex gap-2">
                      <select
                        value={filterName}
                        onChange={handleUserNameChange}
                        className="cursor-pointer bg-cardColor border border-black text-textColor text-sm rounded-lg focus:outline-none block"
                      >
                        <option value="">Select User </option>
                        {getUserNames().map((name) => (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className=" border border-black">
                      <DateRangePickerComp onChange={handleDateRangeChange} />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <button
                      onClick={resetFilters}
                      className="px-2 py-1 rounded bg-blue-500 hover:bg-blue-700 text-white text-xs sm:text-sm"
                    >
                      Reset Filters
                    </button>
                    <button className="px-2 py-1 rounded bg-red-500 hover:bg-red-700 text-white text-xs sm:text-sm"
                      onClick={handleToggleFilterModal}>Close</button>
                  </div>
                </div>
              </div>
            )}
            <div className="flex-auto justify-between items-center mb-4">
              {filteredAttendance.length > 0 ? (
                <table className="w-full table-auto border-collapse border border-gray-200">
                  <thead>
                    <tr className="border-b border-gray-200 text-center">
                      <th className="px-2 py-1">Entry</th>
                      <th className="px-2 py-1">Name</th>
                      <th className="px-2 py-1">Date</th>
                      <th className="px-2 py-1">Time-In</th>
                      <th className="px-2 py-1">Time-Out</th>
                      <th className="px-2 py-1">Total Hrs</th>
                      <th className="px-2 py-1">Status</th>
                    </tr>
                  </thead>
                  <tbody>
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
                        <tr
                          key={index}
                          className="border border-gray-200 hover:bg-gray-100 text-center"
                        >
                          <td className="px-2 py-1">{index + 1}</td>
                          <td className="px-2 py-1">{user.userName}</td>
                          <td className="px-2 py-1">{user.date}</td>
                          <td className="px-2 py-1">{new Date(`1970-01-01T${user.timeIn}`).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</td>
                          <td className="px-2 py-1">
                            {user.timeOut ?
                              new Date(`1970-01-01T${user.timeOut}`).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
                              :
                              "--:--"
                            }
                          </td>
                          <td className="px-2 py-1">
                            {user.totalHours == "0.00" ? "-" : user.totalHours}
                          </td>
                          <td className={`px-2 py-1  ${getColorForStatus(user.status)}`}>{user.status}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                <p>No attendance data available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsTemplate;
