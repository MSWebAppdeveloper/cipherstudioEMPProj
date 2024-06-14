import React, { useState } from "react";

import { leaveApplicationsInterface } from "./leaveApplicationsInterface";
import { Icon } from "@iconify/react/dist/iconify.js";

import TableComponent from "@/components/TableComponent";
const LeaveApplicationsTemplate: React.FC<leaveApplicationsInterface> = ({
  leaveHistory,
  approveApplication,
  rejectApplication,
  currentPage,
  totalPages,
  paginate,
  totalCount,
  OnchangeData,
  formdata,
  handleSort,
  sortOrder,
  sortColumn,
}) => {
  const [currentStatus, setCurrentStatus] = useState("ALL");

  const handleFilterChange = (value: string) => {
    setCurrentStatus(value);
  };

  const filterOptions = ["ALL", "Pending", "Approved", "Rejected"];
  // Filter users based on the current tab
  const filteredUsers: any =
    currentStatus === "ALL"
      ? leaveHistory
      : leaveHistory?.filter((user) => user.status === currentStatus);

  const columns = [
    {
      key: "index",
      label: "S NO.",
      render: (item: any, index: number) => <span>{index + 1}</span>,
      sortable: false,
    },
    { key: "userName", label: "NAME", sortable: true },
    { key: "leaveType", label: "LEAVE TYPE", sortable: true },
    { key: "createdAt", label: "Submitted Date&Time", sortable: true },
    { key: "startDate", label: "START DATE", sortable: true },
    { key: "endDate", label: "END DATE", sortable: false },
    { key: "total_days", label: "Total Days", sortable: true },
    { key: "reason", label: "REASON", sortable: false },
    {
      key: "status",
      label: "STATUS",
      render: (item: { status: any }) => {
        let colorClass = "";
        switch (item.status) {
          case "Pending":
            colorClass = "bg-yellow-500";
            break;
          case "Approved":
            colorClass = "bg-green-500";
            break;
          case "Rejected":
            colorClass = "bg-red-500";
            break;
          default:
            colorClass = "bg-gray-500";
        }
        return (
          <span className={`px-2 py-1 rounded text-white ${colorClass}`}>
            {" "}
            {item.status}
          </span>
        );
      },
      sortable: false,
    },
    {
      key: "actions",
      label: "ACTIONS",
      render: (leave: { id: any; status: string }) =>
        leave.status === "Pending" ? (
          <div className="flex">
            <div>
              <button
                className="rounded-full bg-green-500 text-white text-md hover:bg-green-600 shadow-xl mr-3 p-2"
                onClick={() => approveApplication(leave.id)}
              >
                <Icon icon="material-symbols:check" width={22} height={22} />
              </button>
            </div>
            <div>
              <button
                className="rounded-full bg-red-500 text-white text-md hover:bg-red-600 shadow-xl p-2"
                onClick={() => rejectApplication(leave.id)}
              >
                <Icon icon="iconoir:xmark" width={22} height={22} />
              </button>
            </div>
          </div>
        ) : null,
      sortable: false,
    },
  ];
  return (
    <>
      <div>
        <div className="p-5 box-shadow rounded-md mt-4 lg:px-8 lg:py-10">
          <div className="flex justify-between items-center">
            {/*-dropdown*/}
            <div className="flex items-center">
              <span className="mr-4 text-lg font-medium">Sort by :</span>
              <select
                id="response"
                className="border border-gray-300 text-gray-800 text-md rounded-md block lg:p-2 p-2 md:p-2 sm:p-2 bg-slate-50"
                value={currentStatus}
                onChange={(e) => handleFilterChange(e.target.value)}
              >
                {filterOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/*table*/}
          <div className="mt-10">
            <div className="overflow-x-auto">
              {filteredUsers.length > 0 ? (
                <TableComponent
                  data={filteredUsers}
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
                />
              ) : (
                <p>No Leave Applications data available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaveApplicationsTemplate;
