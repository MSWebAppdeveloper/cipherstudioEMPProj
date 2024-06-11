"use client";
import React, { useState } from "react";
import { CSVLink } from "react-csv";
import { ReportsInterface } from "./reportsInterface";
import DateRangePickerComp from "@/components/DateRangePickerComp";
import TableComponent from "@/components/TableComponent";
import { render } from "react-dom";

const ReportsTemplate: React.FC<ReportsInterface> = ({
  attendance,
  reports,
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
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  fetchAllRecords,
  downloadData,
  handleSort, 
  sortOrder,
  sortColumn,
  nameOptions,
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

  //   <td className="p-2 whitespace-nowrap">
  //   <div>
  //     {new Date(`1970-01-01T${user.timeIn}`).toLocaleString(
  //       "en-US",
  //       {
  //         hour: "numeric",
  //         minute: "numeric",
  //         hour12: true,
  //       }
  //     )}
  //   </div>
  // </td>
  // <td className="p-2 whitespace-nowrap">
  //   <div className="">
  //     {user.timeOut
  //       ? new Date(
  //           `1970-01-01T${user.timeOut}`
  //         ).toLocaleString("en-US", {
  //           hour: "numeric",
  //           minute: "numeric",
  //           hour12: true,
  //         })
  //       : "--:--"}
  //   </div>
  // </td>
  const columns = [
    {
      key: "index",
      label: "S NO.",
      render: (item: any, index: number) => <span>{index + 1}</span>
    },
    { key: "userName", label: "NAME" },
    { key: "date", label: "DATE" },
    {
      key: "timeIn", label: "TIME-IN",
      render: (item: { timeIn: any }) => {
        return <div>
          {new Date(`1970-01-01T${item.timeIn}`).toLocaleString(
            "en-US",
            {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            }
          )}
        </div>
      }
    },
    {
      key: "timeOut", label: "TIME-OUT",
      render: (item: { timeOut: any }) => {
        return <div>
          {new Date(`1970-01-01T${item.timeOut}`).toLocaleString(
            "en-US",
            {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            }
          )}
        </div>
      }
    },
    { key: "totalHours", label: "TOTAL-HRS" },
    {
      key: "status",
      label: "Status",
      render: (item: { status: any }) => {
        let colorClass = "";
        switch (item.status) {
          case "Active":
            colorClass = "text-green-500";
          case "Absent":
            colorClass = "text-red-500"; // Red for Absent
            break;
          case "Leave":
            colorClass = "text-orange-500"; // Orange for Leave
            break;
          case "Leave (Half Day)":
            colorClass = "text-lightcoral"; // Lighter orange for Half Day Leave
            break;
          case "Short Leave":
            colorClass = "text-violet-500"; // Violet for Short Leave
            break;
          case "Full Day":
            colorClass = "text-yellow-500"; // yellow for Present
            break;
          case "Present(forget dayout)":
            colorClass = "text-yellow-300"; // Lighter green for Present (Extra Hours)
            break;
          default:
            colorClass = ""; // No color for unknown status  
        }
        return <span className={colorClass}>{item.status}</span>;
      },
    },
  ];

  return (
    <>
      <div>
        <div className="flex justify-between items-center lg:py-8 md:py-4 btn-sec">
          <div>
            <h2 className="text-2xl font-medium">Attendance Report</h2>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={fetchAllRecords}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Fetch data
            </button>
            <CSVLink data={downloadData} filename="attendance_report.csv">
              <button className="bg-green-500 text-white px-4 py-2 rounded">
                Download Reports
              </button>
            </CSVLink>
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
        <TableComponent
          data={filteredAttendance}
          columns={columns}
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
          totalCount={totalCount}
          OnchangeData={OnchangeData}
          formdata={formdata}
          handleSort={handleSort}
          sortOrder={sortOrder}
          sortColumn={sortColumn} 
           nameOptions={getUserNames()}
          filterName={filterName}
          setFilterName={setFilterName}
          OnchangeData={OnchangeData} />

      </div>
    </>
  );
};

export default ReportsTemplate;