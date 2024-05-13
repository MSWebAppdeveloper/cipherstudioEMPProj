/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { RequestInterface } from "./RequestInterface";
import Pagination from "@/components/Pagination";

const RequestTemplate: React.FC<RequestInterface> = ({
    // deleteSelected,
    openEditPopup,
    setModal,
    leaveHistory,
    leaveOverview,
}) => {
    const [currentTab, setCurrentTab] = useState("All");
    const [isDeleteAlertVisible, setDeleteAlertVisible] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = leaveHistory.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    return (
        <>
            {/*right--sec-start*/}

            <div className="leave-sec">
                <div className="flex justify-between items-center lg:py-8 md:py-4 btn-sec">
                    <div>
                        <h2 className="text-2xl font-medium">Leave Reports</h2>
                    </div>
                    <div>
                        <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal"
                            onClick={() => setModal((prev) => !prev)}
                            className="rounded-md bg-green-500 lg:px-8 lg:py-2 md:px-5 md:py-2 sm:px-3 sm:py-2 text-white hover:bg-green-400 lg:text-lg focus:outline-0">
                            Request Leave
                        </button>
                    </div>
                </div>
                <div className="pb-12 pt-4 px-5 rounded-lg box-shadow mt-5">
                    <h3 className="text-2xl font-medium px-2 py-4">Leave Overview</h3>
                    <div className="flex flex-wrap -m-1 mt-6">
                        {/*-card*/}
                        {Object.keys(leaveOverview).map((leaveType) => (
                            <div key={leaveType} className="w-full sm:w-1/2 lg:w-1/3 md:w-1/2 flex flex-col p-3">
                                <div className="bg-white rounded-lg box-shadow overflow-hidden flex-1 flex flex-col border border-gray-200">

                                    <div key={leaveType} className="px-10 py-6 flex-1 flex flex-col">
                                        <h3 className="mb-4 text-2xl py-3 border-b text-size">
                                            {leaveType}
                                        </h3>
                                        <div className="mb-4 mt-4 text-grey-darker text-sm flex-1">
                                            <ul className="space-y-4">
                                                <li className="text-lg flex justify-between">
                                                    Total leave: {leaveOverview[leaveType].total}
                                                </li>
                                                <li className="text-lg flex justify-between">
                                                    Taken  leave: {leaveOverview[leaveType].taken}
                                                </li>
                                                <li className="text-lg flex justify-between">
                                                    Left  leave: {leaveOverview[leaveType].remaining}
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
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full mt-6">
                            <thead className="text-lg font-semibold uppercase text-gray-800 bg-gray-50">
                                <tr>
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
                                {currentItems.map((user: any, index: any) => (
                                    <tr key={user.id}>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-lg text-gray-600">{user.leaveType}</div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-left text-lg">{user.startDate}</div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-left text-lg">{user.endDate}</div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-lg text-center">{user.reason}</div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-lg text-center">{user.status}</div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-lg text-center">
                                                <button className="px-3 py-1 bg-red-500 text-white text-md rounded-md hover:bg-red-600"
                                                //   onclick="my_modal_11.showModal()"
                                                >
                                                    Delete
                                                </button>
                                                {/*popup*/}
                                                <dialog id="my_modal_11" className="modal rounded-md">
                                                    <div className="modal-box-2 px-8 modal-2 py-4">
                                                        <p className="text-xl pt-3 pb-5">
                                                            Are you sure you want to delete this user?
                                                        </p>
                                                        <div className="modal-action text-end">
                                                            <form method="dialog">
                                                                {/* if there is a button in form, it will close the modal */}
                                                                <button className="btn bg-red-600 text-white mt-2 font-medium text-lg hover:bg-red-500 mb-3 mr-2 px-3 py-2 rounded-md">
                                                                    Yes
                                                                </button>
                                                                <button className="btn bg-gray-300 text-white mt-2 font-medium text-lg hover:bg-gray-500 mb-3 px-3 py-2 rounded-md">
                                                                    No
                                                                </button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </dialog>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                    {/* Pagination */}
                    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
                                <span className="font-medium">{Math.min(indexOfLastItem, leaveHistory.length)}</span> of{" "}
                                <span className="font-medium">{leaveHistory.length}</span> results
                            </p>
                        </div>
                        <div>
                            <Pagination
                                currentPage={currentPage}
                                totalPages={Math.ceil(leaveHistory.length / itemsPerPage)}
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
