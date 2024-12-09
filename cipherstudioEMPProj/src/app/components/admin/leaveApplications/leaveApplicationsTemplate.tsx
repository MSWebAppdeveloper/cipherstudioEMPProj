import React, { useEffect, useRef, useState } from "react";

import { LeaveApplicationsInterface } from "./leaveApplicationsInterface";
import { Icon } from "@iconify/react/dist/iconify.js";

import TableComponent from "@/components/TableComponent";
import { CSVLink } from "react-csv";
import { Tooltip } from "react-tooltip";


const LeaveApplicationsTemplate: React.FC<LeaveApplicationsInterface> = ({
  leaveHistory,
  approveApplication,
  rejectApplication,
  handleFilterChange,
  filterName,
  filterStatus,
  currentPage,
  totalPages,
  paginate,
  totalCount,
  OnchangeData,
  formdata,
  handleSort,
  sortOrder,
  sortColumn,
  allUsers,
  downloadData,
  isLoading,
  fetchAllRecords,
  isDataFetched,
  setIsDataFetched,
}) => {
  const [currentStatus, setCurrentStatus] = useState("ALL");
  const csvLinkRef = useRef(null);

  const getUserNames = () => {
    return allUsers.map((user) => user.name);
  };
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

  const filterOptions = ["Pending", "Approved", "Rejected"];
  // Filter users based on the current tab
  const filteredUsers: any = currentStatus === "ALL"? leaveHistory ?? [] : (leaveHistory?.filter((user) => user.status === currentStatus) ?? []);

  const columns = [
    {
      key: "index",
      label: "S.No",
      render: (item: any, index: number) => <span>{index + 1}</span>,
      sortable: false,
      visible:true
    },
    { key: "userName", label: "NAME", sortable: true , visible:true},
    { key: "leaveType", label: "TYPE", sortable: true , visible:true },
    { key: "startDate", label: "START DATE", sortable: true , visible:true },
    { key: "total_days", label: "DATE", sortable: true , visible:false},
    {
      key: "reason",
      label: "REASON",
      render: (item: any) =>   <div>
      <span 
        data-tooltip-id={`reasonTooltip-${item.id}`} 
        data-tooltip-content={item.reason} 
        className={`truncate`}
      >
        {item.reason.length > 50 ? `${item.reason.substring(0, 50)}...` : item.reason}
      </span>
      {item.reason.length > 50 && (
        <Tooltip id={`reasonTooltip-${item.id}`} className="custom-tooltip" />
      )}
    </div>,
      sortable: false,
      visible:false
    },
    {
      key: "status",
      label: "STATUS",
      render: (item: { status: any }) => {
        let colorClass = "";
        switch (item.status) {
          case "Pending":
            colorClass = "text-yellow-500";
            break;
          case "Approved":
            colorClass = "text-green-500";
            break;
          case "Rejected":
            colorClass = "text-red-500";
            break;
          default:
            colorClass = "text-gray-500";
        }
        return <span className={` rounded ${colorClass}`}> {item.status}</span>;
      },
      sortable: false,
      visible:false
    },
    {
      key: "actions",
      label: "ACTIONS",
      render: (leave: { id: any; status: string }) =>
        leave.status === "Pending" ? (
          <div className="flex">
            <button
              className=" hover:text-green-800 mr-3"
              onClick={() => approveApplication(leave.id)}
            >
              <Icon
                icon="material-symbols:check"
                width={22}
                height={22}
                style={{ color: "#22c55e" }}
              />
            </button>

            <button
              className=" hover:text-red-800 "
              onClick={() => rejectApplication(leave.id)}
            >
              <Icon
                icon="iconoir:xmark"
                width={22}
                height={22}
                style={{ color: "#ef4444" }}
              />
            </button>
          </div>
        ) : null,
      sortable: false,
      visible:true
    },
  ];
  return (
    <>
 
            <div>
              <div className="p-5 box-shadow rounded-md mt-4 lg:px-8 lg:py-8">
                <div className="flex justify-between  items-end flex-wrap gap-2">
                  <div>
                    <div className="flex space-x-4 items-end">
                      <form className="max-w-52">
                        <p className="font-medium pb-2">Filter by :</p>
                        <select
                          id="response"
                          className="border border-gray-300 text-gray-800 text-md rounded-md block lg:p-2 p-2 md:p-2 sm:p-2 bg-slate-50"
                          value={filterStatus}
                          onChange={(e) =>
                            handleFilterChange("status", e.target.value)
                          }
                        >
                          <option value="">All</option>
                          {filterOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </form>
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
                        leaveType: record.leaveType,
                        submittedDate: record.createdAt,
                        startDate: record.startDate,
                        total_days: record.total_days,
                        status: record.status,
                      }))}
                      filename={"LeaveApplication_report.csv"}
                      ref={csvLinkRef}
                      className="hidden"
                    />
                  </div>
                </div>
                {/*table*/}
                <div className="mt-10">
                {(filteredUsers?.length > 0) ? (
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
      
    </>
  );
};

export default LeaveApplicationsTemplate;
