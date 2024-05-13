import React, { useState } from "react";

import { leaveApplicationsInterface } from "./leaveApplicationsInterface";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import Pagination from "@/components/Pagination";
const LeaveApplicationsTemplate: React.FC<leaveApplicationsInterface> = ({
    leaveHistory,
    approveApplication,
    rejectApplication,
}) => {
    console.log(leaveHistory);
    const [currentStatus, setCurrentStatus] = useState("ALL");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const handleFilterChange = (value: string) => {
        setCurrentStatus(value);
        setCurrentPage(1);
    };

    const filterOptions = ["ALL", "pending", "approved", "rejected"];
    // Filter users based on the current tab
    const filteredUsers: any =
        currentStatus === "ALL"
            ? leaveHistory
            : leaveHistory?.filter((user) => user.status === currentStatus);

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <>
            <div>
                <div>
                    <h2 className="lg:py-8 md:py-8 sm:py-8 py-8 text-2xl font-medium">
                        Leave Status
                    </h2>
                </div>
                <div className="box-shadow py-12 px-4 rounded-md mt-4">
                    {/*-dropdown*/}
                    <div className="px-2">
                        <form className="max-w-52">
                            <label className="text-lg font-medium">Sort by</label>
                            <select
                                id="countries"
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
                    {/*table*/}
                    <div className="overflow-x-auto">
                        {currentItems.length > 0 ? (
                            <table className="table-auto w-full mt-6">
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
                                            <div className="font-semibold">START DATE</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold">END DATE</div>
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
                                    {currentItems
                                        .slice() // Create a copy of the array to avoid mutating the original
                                        .sort((a: any, b: any) => {
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
                                        }).map((leave: any, index: any) => (
                                            <tr key={leave.id} className="text-lg text-gray-600">
                                                <td className="p-2 whitespace-nowrap">
                                                    <div>{index + 1}</div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div>Shree</div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div>{leave.leaveType}</div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div>
                                                        {leave.startDate}
                                                    </div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="">
                                                        {leave.endDate}
                                                    </div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div>
                                                        {leave.reason}
                                                    </div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div>
                                                        {leave.status}
                                                    </div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    {leave.status === "pending" && (
                                                        <div className="flex">
                                                            <div>
                                                                <button className="rounded-full bg-green-500 text-white text-md hover:bg-green-600 shadow-xl mr-3 p-2"
                                                                    onClick={() => approveApplication(leave.id)}>
                                                                    <Icon icon="material-symbols:check" width={22} height={22} />
                                                                </button>
                                                            </div>
                                                            <div>
                                                                <button className="rounded-full bg-red-500 text-white text-md hover:bg-red-600 shadow-xl p-2"
                                                                    onClick={() => rejectApplication(leave.id)}
                                                                >
                                                                    <Icon icon="iconoir:xmark" width={22} height={22} />
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
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
                                <span className="font-medium">{Math.min(indexOfLastItem, filteredUsers.length)}</span> of{" "}
                                <span className="font-medium">{filteredUsers.length}</span> results
                            </p>
                        </div>
                        <div>
                            <Pagination
                                currentPage={currentPage}
                                totalPages={Math.ceil(filteredUsers.length / itemsPerPage)}
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


