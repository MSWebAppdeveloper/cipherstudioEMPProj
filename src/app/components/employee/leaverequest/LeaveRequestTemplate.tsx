import React, { useEffect, useState } from "react";
import { LeaveRequestInterface } from "./leaveRequestInterface";

import TableComponent from "@/components/TableComponent";

const LeaveRequestTemplate: React.FC<LeaveRequestInterface> = ({
    deleteSelected,
    isDeleteConfirmationVisible,
    selectedUserId,
    setModal,
    leaveHistory,
    currentPage,
    totalPages,
    paginate,
    totalCount,
    OnchangeData,
    formdata,
    leaveTypes,
    confirmDeleteUser,
    cancelDeleteUser,
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

    const years = Array.from(
        { length: 10 },
        (_, i) => new Date().getFullYear() - i
    );
    const columns = [
        {
            key: "index",
            label: "S NO.",
            render: (item: any, index: number) => <span>{index + 1}</span>,
            sortable: false,
        },
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
                    <div className="text-lg text-center">
                        <button
                            className="px-3 py-1 bg-red-500 text-white text-md rounded-md hover:bg-red-600"
                            onClick={() => deleteSelected(leave.id)}
                        >
                            Delete
                        </button>
                    </div>
                ) : null,
            sortable: false,
        },
    ];
    function getBackgroundColor(leaveType: any) {
        switch (leaveType) {
            case "Casual Leave":
                return "blue-500"; // Example color for sick leave
            case "Earned Leave":
                return "gray-500"; // Example color for vacation leave
            case "Medical Leave":
                return "gray-500"; // Example color for personal leave
            case "Half-Day Leave":
                return "green-500"; // Example color for personal leave
            case "Short Leave":
                return "indigo-600"; // Example color for personal leave
            // Add more cases as needed
            default:
                return "gray-500"; // Default color
        }
    }
    return (
        <>
            <div>
                <div className="pb-12 pt-4 px-5 rounded-lg box-shadow mt-5">
                    <div className="text-end pb-5 pt-2">
                        <button
                            data-modal-target="authentication-modal"
                            data-modal-toggle="authentication-modal"
                            onClick={() => setModal((prev) => !prev)}
                            className="rounded-md bg-blue-500 hover:bg-blue-400 lg:px-5 lg:py-2 md:px-5 md:py-2 sm:px-3 sm:py-2 text-white lg:text-lg focus:outline-0"
                        >
                            Request Leave
                        </button>
                    </div>
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
                            <div
                                key={id}
                                className="w-full sm:w-1/2 lg:w-1/3 md:w-1/2 flex flex-col p-3"
                            >
                                <div
                                    className={`bg-${getBackgroundColor(
                                        leaveType.leaveType
                                    )} opacity-75 text-white rounded-lg box-shadow overflow-hidden flex-1 flex flex-col`}
                                >
                                    <div className="px-3 py-3 flex-1 flex flex-col">
                                        <div className="flex justify-between">
                                            <div className="px-3">
                                                <h3 className="mb-4 text-2xl py-2 border-b text-size">
                                                    {leaveType.leaveType}
                                                </h3>
                                            </div>
                                            <div className="mb-3 mt-1 text-grey-darker text-sm flex-1 px-6">
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
                            </div>
                        ))}
                    </div>
                </div>
                {/*table*/}
                <div className="p-5 box-shadow rounded-md mt-4 lg:px-8 lg:py-10">
                    {" "}
                    <h3 className="text-2xl font-medium py-5">Leave History</h3>
                    <div className="flex justify-between items-center">
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default LeaveRequestTemplate;
