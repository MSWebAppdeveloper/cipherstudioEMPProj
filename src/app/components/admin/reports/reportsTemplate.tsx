"use client";
import React, { useEffect, useRef, useState } from "react";
import { CSVLink } from "react-csv";
import { ReportsInterface } from "./reportsInterface";
import TableComponent from "@/components/TableComponent";
import DateRangePickerComp from "@/components/DateRangePickerComp";
import EmployeeNavbar from "@/components/EmployeeNavbar";
import Sidebar from "@/components/Sidebar";
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
  isLoading,
  isDataFetched,
  setIsDataFetched,
}) => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const csvLinkRef = useRef(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  const handleToggleFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  };

  const resetFilters = () => {
    setFilterName("");
    setStartDate(null);
    setEndDate(null);
  };

  const getUserNames = () => {
    return allUsers.map((user) => user.name);
  };

  const filteredAttendance = attendance?.filter((record) => {
    const matchName = !filterName || record.userName === filterName;
    const matchDate =
      (!startDate && !endDate) ||
      (new Date(record.date) >= new Date(startDate) &&
        new Date(record.date) <= new Date(endDate));
    return matchName && matchDate;
  });

  const handleFetchAndDownload = async () => {
    setIsDataFetched(false);
    await fetchAllRecords();
    setIsDataFetched(true);
  };

  useEffect(() => {
    if (isDataFetched && csvLinkRef.current) {
      (csvLinkRef.current as any).link.click();
      setIsDataFetched(false);
    }
  }, [isDataFetched]);

  const columns = [
    {
      key: "index",
      label: "S NO.",
      render: (item: any, index: number) => <span>{index + 1}</span>,
      sortable: false,
    },
    { key: "userName", label: "NAME", sortable: true },
    { key: "date", label: "DATE", sortable: true },
    {
      key: "timeIn",
      label: "TIME-IN",
      sortable: true,
    },
    {
      key: "timeOut",
      label: "TIME-OUT",
      sortable: false,
    },
    { key: "totalHours", label: "TOTAL-HRS", sortable: true },
    {
      key: "status",
      label: "Status",
      render: (item: { status: any }) => {
        let colorClass = "";
        switch (item.status) {
          case "Active":
            colorClass = "text-green-500";
            break;
          case "Absent":
            colorClass = "text-red-500";
            break;
          case "Leave":
            colorClass = "text-orange-500";
            break;
          case "Leave (Half Day)":
            colorClass = "text-lightcoral";
            break;
          case "Short Leave":
            colorClass = "text-violet-500";
            break;
          case "Full Day":
            colorClass = "text-yellow-500";
            break;
          case "Present(forget dayout)":
            colorClass = "text-yellow-300";
            break;
          default:
            colorClass = "";
        }
        return <span className={colorClass}>{item.status}</span>;
      },
      sortable: false,
    },
  ];

  return (
    <>
      <div>
        <EmployeeNavbar toggleSidebar={toggleSidebar} />
        <div className="flex w-100" id="body-row">
          <Sidebar isCollapsed={isCollapsed} />
          <div
            className={`right-sec lg:px-8 md:px-4 sm:px-4 ${
              isCollapsed ? "collapsed" : ""
            }`}
          >
            <div>
              <div className="p-5 box-shadow rounded-md mt-4 lg:px-8 lg:py-10">
                <div className="flex justify-between items-center">
                  <div className="flex">
                    <div className="max-w-52 grow mr-4">
                      <form className="max-w-52">
                        <select
                          id="name"
                          className="border border-gray-300 text-gray-800 text-md rounded-md block lg:p-2 p-2 md:p-2 sm:p-2 bg-slate-50"
                          value={filterName}
                          onChange={(e) =>
                            handleFilterChange("name", e.target.value)
                          }
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
                          className="border border-gray-300 text-gray-800 text-md rounded-md block lg:p-2 p-2 md:p-2 sm:p-2 bg-slate-50"
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
                        <div
                          className="absolute top-0 left-0 h-full w-full  flex justify-center items-center"
                          style={{
                            zIndex: "900",
                            background: "rgba(0, 0, 0, 0.6)",
                          }}
                        >
                          <div>
                            <div className="bg-white p-4 rounded-md shadow-md">
                              <div className="grid gap-4 mb-4">
                                <div className="border border-black">
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

                  <div>
                    <button
                      className="rounded-md bg-blue-500 hover:bg-blue-400 lg:px-5 lg:py-2 md:px-5 md:py-2 sm:px-3 sm:py-2 text-white lg:text-lg focus:outline-0"
                      onClick={handleFetchAndDownload}
                      disabled={isLoading}
                    >
                      {isLoading ? "Loading..." : "Download Reports"}
                    </button>
                    <CSVLink
                      data={downloadData.map((record) => ({
                        userName: record.userName,
                        date: record.date,
                        timeIn: record.timeIn,
                        timeOut: record.timeOut,
                        status: record.status,
                        totalHours: record.totalHours,
                      }))}
                      filename={"attendance_report.csv"}
                      ref={csvLinkRef}
                      className="hidden"
                    />
                  </div>
                </div>

                <div className="mt-10">
                  <div className="overflow-x-auto">
                    <TableComponent
                      columns={columns}
                      data={filteredAttendance}
                      currentPage={currentPage}
                      totalPages={totalPages}
                      paginate={paginate}
                      totalCount={totalCount}
                      OnchangeData={OnchangeData}
                      formdata={formdata}
                      handleSort={handleSort}
                      sortOrder={sortOrder}
                      sortColumn={sortColumn}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportsTemplate;
