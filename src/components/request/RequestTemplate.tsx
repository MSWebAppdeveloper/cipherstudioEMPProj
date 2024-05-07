/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { RequestInterface } from "./RequestInterface";

const RequestTemplate: React.FC<RequestInterface> = ({
    // deleteSelected,
    openEditPopup,
    setModal,
    leaveHistory,
}) => {
    const [currentTab, setCurrentTab] = useState("All");
    const [isDeleteAlertVisible, setDeleteAlertVisible] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState("");


    return (
        <div className="container w-full bg-white overflow-x-auto">
            <div className="container mx-auto px-4 py-4">
                <div className="grid md:grid-cols-1 gap-4">
                    <div className="bg-white shadow-md rounded px-4 py-4">
                        <div className="flex justify-between items-center  pb-2">
                            <div className="flex gap-2 flex-wrap">
                                <h3 className="text-base font-bold text-gray-800 mb-2">
                                    Leave Overview
                                </h3>
                            </div>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs sm:text-sm "
                                onClick={() => setModal((prev) => !prev)}
                            >
                                Request Leave
                            </button>
                        </div>
                    </div>
                </div>
                <div className="grid md:grid-cols-1 gap-4">
                <div className="bg-white shadow-md rounded px-4 py-4">
                    <div className="flex justify-between items-center  pb-2">
                        <div className="flex gap-2 flex-wrap">
                            <h3 className="text-base font-bold text-gray-800 mb-2">
                                Leave History
                            </h3>
                        </div>
                    </div>
                    <div className="flex-auto justify-between items-center mb-4">
                        <table className="table-auto border-collapse border border-gray-200 w-full">
                            <thead>
                                <tr className="border-b border-gray-200 text-center">
                                    <th className="px-2 py-1">Leave Type</th>
                                    <th className="px-2 py-1">Start Date</th>
                                    <th className="px-2 py-1">EndDate</th>
                                    <th className="px-2 py-1">Reason</th>
                                    <th className="px-2 py-1">Status</th>
                                    <th className="px-2 py-1">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaveHistory.map((user: any, index: any) => (
                                    <tr
                                        key={user.id}
                                        className="border border-gray-200 hover:bg-gray-100 text-center"
                                    >
                                        <td className="px-2 py-1">{user.leaveType}</td>
                                        <td className="px-2 py-1">{user.startDate}</td>
                                        <td className="px-2 py-1">{user.endDate}</td>
                                        <td className="px-2 py-1">{user.reason}</td>
                                        <td className="px-2 py-1">{user.status}</td>
                                        <td className="px-2 py-1 flex items-center justify-center gap-2">
                                            <button
                                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-xs sm:text-sm mr-2"
                                                onClick={() => openEditPopup(user)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-xs sm:text-sm"
                                                // onClick={() => deleteSelected(user.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                      
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            </div>


            
        </div>
    );
};


export default RequestTemplate;
