import React from 'react';
import { Icon } from "@iconify/react";
import { LeaveRequestInterface } from './LeaveRequestInterface';
import { UseModal } from '@/components/common/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


const LeaveRequestTemplate: React.FC<LeaveRequestInterface> = ({
    dataChange,
    handleOnSubmit,
    formdata,
    leaveTypes,
    isModal,
    handleClose,
    loading,
}) => {
    return (
        <>
            <UseModal isOpen={isModal} closeModal={handleClose}>
                <div
                    className={`relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10 overflow-y-auto`}
                >
                    <div className="flex justify-end">
                        <button
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold  rounded m-2 sm:w-auto md:w-auto" // Adjust button size for small and medium screens
                        >
                            <Icon icon="material-symbols-light:cancel-outline" width="2em" height="2em" className=" hover:from-fuchsia-100 cursor-pointer"
                                onClick={handleClose}
                            />
                        </button>
                    </div>
                    <div className="w-auto">
                        <div className="text-center">
                            <h1 className="text-3xl font-semibold text-gray-900">
                                Request Leave
                            </h1>
                        </div>
                        <div className="mt-5">
                            <form onSubmit={handleOnSubmit}>
                                {/* Account Type Field */}
                                <div className="mb-4">
                                    <label htmlFor="leaveType" className="block text-sm font-medium text-textColor">
                                        Leave Type:</label>
                                    <select
                                        id="leaveType"
                                        required
                                        name='leaveType'
                                        onChange={dataChange}
                                        value={formdata.leaveType}
                                        className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"

                                    >
                                        <option value="" disabled>Select Leave Type</option>
                                        {leaveTypes.map((leaveType) => (
                                            <option key={leaveType.leave_type_id} value={leaveType.leave_type_id}>
                                                {leaveType.leave_type_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Start Date Field (Always shown) */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="startDate"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                    >
                                        Start Date
                                    </label>
                                    <input
                                        type="date"
                                        id="startDate"
                                        name="startDate"
                                        value={formdata.startDate}
                                        onChange={dataChange}
                                        required
                                        className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"

                                    />

                                </div>

                                {/* Start Date Field (Always shown) */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="endDate"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                    >
                                        End Date
                                    </label>
                                    <input
                                        type="date"
                                        id="endDate"
                                        name="endDate"
                                        value={formdata.endDate}
                                        onChange={dataChange}
                                        required
                                        className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"

                                    />

                                </div>

                                {/* Leave Reason Field (Always shown) */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="reason"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                    >
                                        Leave Reason
                                    </label>
                                    <input
                                        type='text'
                                        placeholder="type here..."
                                        id="reason"
                                        name="reason"
                                        value={formdata.reason}
                                        onChange={dataChange}
                                        required
                                        className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"

                                    />

                                </div>




                                <button
                                    type="submit"
                                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500${isModal && "sm:w-full"
                                        }`}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <FontAwesomeIcon icon={faSpinner} className="spinner mr-2" spin /> // Add spin prop
                                    ) : (
                                        <>{"Submit Leave Request"}</>
                                    )}
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </UseModal >
        </>
    );
};

export default LeaveRequestTemplate;
