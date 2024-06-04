import React, { useState } from "react";

import { leaveApplicationsInterface } from "./leaveApplicationsInterface";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Pagination from "@/components/Pagination";
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
  getColorForStatus,
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

  return (
    <>
      <div>
       
        <div className="box-shadow pb-12 pt-5 px-8 rounded-md mt-5">
          {/*-dropdown*/}
          <div>
            <form className="max-w-52">
              <label className="text-lg font-medium">Sort by</label>
              <select
                id="response"
                className="border border-gray-300 text-gray-800 text-md rounded-md block w-full lg:p-2 p-2 md:p-2 sm:p-2 bg-slate-50 mt-2"
                value={currentStatus}
                onChange={(e) => handleFilterChange(e.target.value)}
              >
                {filterOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </form>
          </div>
          {/*table*/}
          <div className="overflow-x-auto">
            {filteredUsers.length > 0 ? (
              <table className="table-auto w-full mt-10">
                <thead className="text-lg font-semibold uppercase text-gray-800 bg-gray-50 text-left">
                  <tr>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold">S NO.</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold">NAME</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold">LEAVE TYPE</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold ">Submitted Date&Time</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold">START DATE</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold">END DATE</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold">Total Days</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold">REASON</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold">STATUS</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold">ACTIONS</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-md divide-y divide-gray-100">
                  {filteredUsers.map((leave: any, index: any) => (
                    <tr key={leave.id} className="text-lg text-gray-600">
                      <td className="p-2 whitespace-nowrap">
                        <div>{index + 1}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div>{leave.userName}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div>{leave.leaveType}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div >
                          {leave.createdAt}
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div>{leave.startDate}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="">{leave.endDate}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="">{leave.total_days}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div>{leave.reason}</div>
                      </td>
                      <td className={`p-2 whitespace-nowrap ${getColorForStatus(
                        leave.status
                      )}`}
                      >
                        <div >{leave.status}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        {leave.status === "Pending" && (
                          <div className="flex">
                            <div>
                              <button
                                className="rounded-full bg-green-500 text-white text-md hover:bg-green-600 shadow-xl mr-3 p-2"
                                onClick={() => approveApplication(leave.id)}
                              >
                                <Icon
                                  icon="material-symbols:check"
                                  width={22}
                                  height={22}
                                />
                              </button>
                            </div>
                            <div>
                              <button
                                className="rounded-full bg-red-500 text-white text-md hover:bg-red-600 shadow-xl p-2"
                                onClick={() => rejectApplication(leave.id)}
                              >
                                <Icon
                                  icon="iconoir:xmark"
                                  width={22}
                                  height={22}
                                />
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No Leave Applications data available.</p>
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
                  {currentPage === 1
                    ? 1
                    : (currentPage - 1) * formdata.limit + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {currentPage === totalPages
                    ? (currentPage - 1) * formdata.limit +
                    filteredUsers.length
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
      </div>
    </>
  );
};

export default LeaveApplicationsTemplate;
