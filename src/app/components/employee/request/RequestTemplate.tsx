/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { RequestInterface } from "./RequestInterface";
import Pagination from "@/components/Pagination";

const RequestTemplate: React.FC<RequestInterface> = ({
    deleteSelected,
    isDeleteConfirmationVisible,
    selectedUserId,
    openEditPopup,
    setModal,
    leaveHistory,
    getColorForStatus,
    currentPage,
    totalPages,
    paginate,
    totalCount,
    OnchangeData,
    formdata,
    leaveTypes,
    confirmDeleteUser,
    cancelDeleteUser,
    selectedYear,
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

    const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);
    return (
        <>
            {/*right--sec-start*/}

            <div className="leave-sec">
                <div className="flex justify-between items-center lg:py-5 md:py-4 btn-sec">
                    <div>
                        <h2 className="text-2xl font-medium">Leave Reports</h2>
                    </div>
                    <div>
                        <button
                            data-modal-target="authentication-modal"
                            data-modal-toggle="authentication-modal"
                            onClick={() => setModal((prev) => !prev)}
                            className="rounded-md bg-green-500 lg:px-8 lg:py-2 md:px-5 md:py-2 sm:px-3 sm:py-2 text-white hover:bg-green-400 lg:text-lg focus:outline-0"
                        >
                            Request Leave
                        </button>
                    </div>
                </div>
                <div className="pb-12 pt-4 px-5 rounded-lg box-shadow mt-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-medium px-2 py-4">Leave Overview</h3>
                        <div className="flex items-center">
                            <span className="mr-4 text-lg font-medium">Year:</span>
                            <select
                                value={formdata.year}
                                name="year"
                                onChange={OnchangeData}
                                className="border border-gray-300 text-gray-800 text-md rounded-md block lg:p-2 p-2 md:p-2 sm:p-2 bg-slate-50"
                            >
                                <option value="">Select year</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-wrap -m-1 mt-3">
                        {/*-card*/}
                        {leaveTypes.map((leaveType, id) => (
                            <div key={id} className="w-full sm:w-1/2 lg:w-1/3 md:w-1/2 flex flex-col p-3">
                                <div className="bg-white rounded-lg box-shadow overflow-hidden flex-1 flex flex-col border border-gray-200">
                                    <div className="px-8 py-3 flex-1 flex flex-col">
                                        <h3 className="mb-4 text-2xl py-3 border-b text-size">
                                            {leaveType.leaveType}
                                        </h3>
                                        <div className="mb-3 mt-1 text-grey-darker text-sm flex-1">
                                            <ul className="space-y-2">
                                                <li className="text-lg flex justify-between">
                                                    Allowed Leaves : {leaveType.allowedLeaves}
                                                </li>
                                                <li className="text-lg flex justify-between">
                                                    Taken Leaves : {leaveType.totalTakenLeave}
                                                </li>
                                                <li className="text-lg flex justify-between">
                                                    Left Leaves : {leaveType.leavesLeft}
                                                </li>
                                                <li className="text-lg flex justify-between">
                                                    Extra Taken Leaves : {leaveType.extraTakenLeaves}
                                                </li>
                                                <li className="text-lg flex justify-between">
                                                    Pending Leaves : {leaveType.pendingLeaves}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/*table*/}
                <div className="lg:px-6 lg:pb-10 lg:pt-4 md:py-5 md:px-5 sm:px-4 sm:py-5 rounded-lg box-shadow lg:mt-12 md:mt-4 sm:mt-6 attendance-table mb-8">
                    <h3 className="text-2xl font-medium py-5">Leave History</h3>
                    <div className="px-2">
                        <form className="max-w-52">
                            <label className="text-lg font-medium">Sort by</label>
                            <select
                                id="response"
                                className="border border-gray-300 text-gray-800 text-md rounded-md block w-full lg:p-2 p-2 md:p-2 sm:p-2 bg-slate-50 mt-2 mb-4"
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
                    <div className="overflow-x-auto">
                        {filteredUsers.length > 0 ? (
                            <table className="table-auto w-full mt-6">
                                <thead className="text-lg font-semibold uppercase text-gray-800 bg-gray-50  text-left">
                                    <tr>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold">S NO.</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold ">LEAVE TYPE</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold ">Submitted Date&Time</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold ">START DATE</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold ">END DATE</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold ">Total Days</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold ">REASON</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold ">STATUS</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold">ACTIONS</div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-md divide-y divide-gray-100">
                                    {filteredUsers.map((user: any, index: any) => (
                                        <tr key={user.id}>
                                            <td className="p-2 whitespace-nowrap">
                                                <div>{index + 1}</div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap">
                                                <div >
                                                    {user.leaveType}
                                                </div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap">
                                                <div >
                                                    {user.createdAt}
                                                </div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap">
                                                <div >{user.startDate}</div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap">
                                                <div >{user.endDate}</div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap">
                                                <div >{user.total_days}</div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap">
                                                <div>{user.reason}</div>
                                            </td>
                                            <td
                                                className={`p-2 whitespace-nowrap  ${getColorForStatus(
                                                    user.status
                                                )}`}
                                            >
                                                <div >{user.status}</div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap">
                                                {user.status === "Pending" && (
                                                    <div className="text-lg text-center">
                                                        <button
                                                            className="px-3 py-1 bg-red-500 text-white text-md rounded-md hover:bg-red-600"
                                                            onClick={() => deleteSelected(user.id)}
                                                        >
                                                            Delete
                                                        </button>
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
                        {isDeleteConfirmationVisible && (
                            <div className="fixed inset-0 z-10 overflow-y-auto flex justify-center items-center">
                                <div className="absolute inset-0 bg-black opacity-50"></div>
                                <div className="relative bg-white rounded-lg p-8">
                                    <p className="text-lg font-semibold mb-4">
                                        Are you sure you want to delete this LeaveApplication?
                                    </p>
                                    <div className="flex justify-end">
                                        <button
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                                            // onClick={confirmDeleteUser}
                                            onClick={() => confirmDeleteUser(selectedUserId)}
                                        >
                                            Yes
                                        </button>
                                        <button
                                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                                            onClick={cancelDeleteUser}
                                        >
                                            No
                                        </button>
                                    </div>
                                </div>
                            </div>
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

export default RequestTemplate;
