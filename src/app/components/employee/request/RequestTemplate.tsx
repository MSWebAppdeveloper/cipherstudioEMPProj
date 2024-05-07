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
        <>
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


              `  <div className="Wrapper-main">
                    {/*header-sec-start*/}
                   
                    {/*header-sec-end*/}
                    {/*-second-sec-start*/}
                    <div className="flex w-100 second-sec">
                        {/*leftbar*/}
                      
                        {/*right--sec-start*/}
                        <div className="right-sec-2 lg:px-8">
                            <div className="leave-sec">
                                <div className="flex justify-between items-center lg:py-8 md:py-4 btn-sec">
                                    <div>
                                        <h2 className="text-2xl font-medium">Leave Reports</h2>
                                    </div>
                                    <div>
                                        <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal"
                                            // onclick="my_modal_14.showModal()" 
                                            className="rounded-md bg-green-500 lg:px-8 lg:py-2 md:px-5 md:py-2 sm:px-3 sm:py-2 text-white hover:bg-green-400 lg:text-lg focus:outline-0">
                                            Request Leave
                                        </button>
                                        {/*modal*/}
                                        <dialog id="my_modal_14" className="modal rounded-xl w-[28rem] add-modal">
                                            <div className="modal-box-2 px-8 modal-2">
                                                <div className="modal-action text-end">
                                                    <form method="dialog">
                                                        {/* if there is a button in form, it will close the modal */}
                                                        <button className="btn bg-gray-100 mt-5 rounded-md px-4 py-2">
                                                            <i className="fa-solid fa-xmark text-2xl" />
                                                        </button>
                                                    </form>
                                                </div>
                                                <h1 className="text-3xl text-dark mb-5 text-center mt-6 text-size">
                                                    Leave Request
                                                </h1>
                                                <form >
                                                    <label className="font-medium text-md text-gray-600 mb-1 block">Leave type
                                                        <select value="Account Type" className="w-full px-4 py-3 rounded-md mb-4 border-gray-300 border block">
                                                            <option >Select Leave Type…</option>
                                                            <option value={1}>Casual Leave</option>
                                                            <option value={2}>Sick Leave</option>
                                                            <option value={1}>Short Leave</option>
                                                            <option value={1}>Half-day Leave</option>
                                                            <option value={1}>Bereavement Leave</option>
                                                            <option value={1}>Maternity Leave</option>
                                                            <option value={1}>Public Holidays</option>
                                                        </select>
                                                    </label>
                                                </form>
                                                <label htmlFor="name" className="block mb-1 font-medium text-gray-600">Start Date</label>
                                                <label>
                                                    <input type="date" name="Select Date Range" id="dateofbirth" placeholder="Select Date Range" defaultValue="Select Date Range" className="border-gray-300 border rounded-md lg:py-2.5 w-full mb-4" />
                                                </label>
                                                <label htmlFor="name" className="block mb-1 font-medium text-gray-600">End Date</label>
                                                <label htmlFor="dateofbirth">
                                                    <input type="date" name="Select Date Range" id="dateofbirth" placeholder="Select Date Range" defaultValue="Select Date Range" className="border-gray-300 border rounded-md lg:py-2.5 w-full mb-4" />
                                                </label>
                                                <label className="font-medium text-md text-gray-600 mb-1 block">Leave Reason</label>
                                                <input type="text" placeholder="type here..." className="border-gray-300 border rounded-md lg:py-2.5 w-full mb-4" />
                                            </div>
                                            <div className="modal-action px-8 mb-4">
                                                <form method="dialog">
                                                    {/* if there is a button in form, it will close the modal */}
                                                    <button className="btn bg-blue-600 text-white mt-4 font-medium text-md hover:bg-blue-400 mr-2 w-full rounded-md py-2 px-4 mb-4">
                                                        Submit Leave Request
                                                    </button>
                                                </form>
                                            </div>
                                        </dialog>
                                    </div>
                                </div>
                                <div className="pb-12 pt-4 px-5 rounded-lg box-shadow mt-5">
                                    <h3 className="text-2xl font-medium px-2 py-4">Leave Overview</h3>
                                    <div className="flex flex-wrap -m-1 mt-6">
                                        {/*-card*/}
                                        <div className="w-full sm:w-1/2 lg:w-1/3 md:w-1/2 flex flex-col p-3">
                                            <div className="bg-white rounded-lg box-shadow overflow-hidden flex-1 flex flex-col border border-gray-200">
                                                <div className="px-10 py-6 flex-1 flex flex-col">
                                                    <h3 className="mb-4 text-2xl py-3 border-b text-size">
                                                        Casual Leave
                                                    </h3>
                                                    <div className="mb-4 mt-4 text-grey-darker text-sm flex-1">
                                                        <ul className="space-y-4">
                                                            <li className="text-lg flex justify-between">
                                                                Total leave <span>4</span>
                                                            </li>
                                                            <li className="text-lg flex justify-between">
                                                                Taken leave <span>1</span>
                                                            </li>
                                                            <li className="text-lg flex justify-between">
                                                                Left leave <span>3</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/*-card*/}
                                        <div className="w-full sm:w-1/2 lg:w-1/3 md:w-1/2 flex flex-col p-3">
                                            <div className="bg-white rounded-lg box-shadow overflow-hidden flex-1 flex flex-col border border-gray-200">
                                                <div className="px-10 py-6 flex-1 flex flex-col">
                                                    <h3 className="mb-4 text-2xl py-3 border-b text-size">
                                                        Earned Leave
                                                    </h3>
                                                    <div className="mb-4 mt-4 text-grey-darker text-sm flex-1">
                                                        <ul className="space-y-4">
                                                            <li className="text-lg flex justify-between">
                                                                Total leave <span>4</span>
                                                            </li>
                                                            <li className="text-lg flex justify-between">
                                                                Taken leave <span>1</span>
                                                            </li>
                                                            <li className="text-lg flex justify-between">
                                                                Left leave <span>3</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/*-card*/}
                                        <div className="w-full sm:w-1/2 lg:w-1/3 md:w-1/2 flex flex-col p-3">
                                            <div className="bg-white rounded-lg box-shadow overflow-hidden flex-1 flex flex-col border border-gray-200">
                                                <div className="px-10 py-6 flex-1 flex flex-col">
                                                    <h3 className="mb-4 text-2xl py-3 border-b text-size">
                                                        Medical Leave
                                                    </h3>
                                                    <div className="mb-4 mt-4 text-grey-darker text-sm flex-1">
                                                        <ul className="space-y-4">
                                                            <li className="text-lg flex justify-between">
                                                                Total leave <span>4</span>
                                                            </li>
                                                            <li className="text-lg flex justify-between">
                                                                Taken leave <span>1</span>
                                                            </li>
                                                            <li className="text-lg flex justify-between">
                                                                Left leave <span>3</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
                                            {leaveHistory.map((user: any, index: any) => (
                                                <tr   key={user.id}>
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
                                    {/*pagination*/}
                                    <div className="py-6 mt-4">
                                        <nav aria-label="Page navigation example">
                                            <ul className="flex items-center -space-x-px h-8 text-sm justify-end">
                                                <li>
                                                    <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                                        <span className="sr-only">Previous</span>
                                                        <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 1 1 5l4 4" />
                                                        </svg>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                                                </li>
                                                <li>
                                                    <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                                                </li>
                                                <li>
                                                    <a href="#" aria-current="page" className="z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                                                </li>
                                                <li>
                                                    <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                                                </li>
                                                <li>
                                                    <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                                                </li>
                                                <li>
                                                    <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                                        <span className="sr-only">Next</span>
                                                        <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 9 4-4-4-4" />
                                                        </svg>
                                                    </a>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
            </div>


        </>
    );
};


export default RequestTemplate;
