import React, { useState } from "react";

import { leaveApplicationsInterface } from "./leaveApplicationsInterface";
import { Icon } from "@iconify/react/dist/iconify.js";

const LeaveApplicationsTemplate: React.FC<leaveApplicationsInterface> = ({
    leaveHistory,
    approveApplication,
    rejectApplication,
}) => {
    console.log(leaveHistory)
    const [currentStatus, setCurrentStatus] = useState("ALL")
    const handleFilterChange = (value: string) => {
        setCurrentStatus(value);
    };
    const filterOptions = ["ALL", "pending", "approved", "rejected"];
    // Filter users based on the current tab
    const filteredUsers: any =
        currentStatus === "ALL"
            ? leaveHistory
            : leaveHistory?.filter((user) => user.status === currentStatus);
    return (
        <>
            <div>
                <div>
                    <h2 className="lg:py-8 md:py-8 sm:py-8 py-8 md:py-4 text-2xl font-medium">
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
                                className="border border-gray-300 text-gray-800 text-lg rounded-md block w-full lg:p-2 p-2 md:p-2 sm:p-2 bg-slate-50 mt-2 mb-4"
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
                        <table className="table-auto w-full mt-6">
                            <thead className="text-lg font-semibold uppercase text-gray-800 bg-gray-50">
                                <tr>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">S NO.</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">NAME</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">LEAVE TYPE</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">START DATE</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">END DATE</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-center">REASON</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-center">STATUS</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold">ACTIONS</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-md divide-y divide-gray-100">
                                {filteredUsers
                                 .slice() // Create a copy of the array to avoid mutating the original
                                 .sort((a:any, b:any) => {
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
                                    <tr key={leave.id}>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-lg text-gray-600">{index + 1}</div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-lg text-gray-600">Shree</div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-lg text-gray-600">{leave.leaveType}</div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-left text-lg text-gray-600">
                                                {leave.startDate}
                                            </div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-left text-lg text-gray-600">
                                                {leave.endDate}
                                            </div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-lg text-center text-gray-600">
                                                {leave.reason}
                                            </div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-lg text-center text-gray-600">
                                                {leave.status}
                                            </div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            {leave.status === "pending" && (
                                                <div className="justify-center flex">
                                                    <div>
                                                        <button className="rounded-full w-10 h-10 bg-green-500 text-white text-md hover:bg-green-600 shadow-xl mr-3"
                                                            onClick={() => approveApplication(leave.id)}>
                                                            <Icon icon="material-symbols:check" width={24} height={24} />
                                                        </button>
                                                    </div>
                                                    <div>
                                                        <button className="rounded-full w-10 h-10 bg-red-500 text-white text-md hover:bg-red-600 shadow-xl"
                                                            onClick={() => rejectApplication(leave.id)}
                                                        >
                                                            <Icon icon="iconoir:xmark" width={24} height={24} />
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
                    {/*pagination*/}
                    <div className="py-6 mt-4">
                        <nav aria-label="Page navigation example">
                            <ul className="flex items-center -space-x-px h-8 text-sm justify-end">
                                <li>
                                    <a
                                        href="#"
                                        className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                        <span className="sr-only">Previous</span>
                                        <svg
                                            className="w-2.5 h-2.5 rtl:rotate-180"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 6 10"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 1 1 5l4 4"
                                            />
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                        1
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                        2
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        aria-current="page"
                                        className="z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                                    >
                                        3
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                        4
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                        5
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                        <span className="sr-only">Next</span>
                                        <svg
                                            className="w-2.5 h-2.5 rtl:rotate-180"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 6 10"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="m1 9 4-4-4-4"
                                            />
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LeaveApplicationsTemplate;
