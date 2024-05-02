import React from 'react';

import { leaveApplicationsInterface } from './leaveApplicationsInterface';

const LeaveApplicationsTemplate: React.FC<leaveApplicationsInterface> = ({
    leaveHistory,
    approveApplication,
    rejectApplication,
}) => {
    return (
        <div className="flex h-screen overflow-hidden">
            
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
             
                <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                    <div className='w-auto'>
                        <div className='p-1'>
                            <div className="flex flex-wrap justify-center w-full p-2">

                                {leaveHistory.map(leave => (
                                    <div key={leave.id} className="relative mx-2 my-2 rounded-lg p-3 border border-gray-300">
                                        <div className={`card p-3 rounded-lg ${leave.status === 'pending' ? 'bg-yellow-100' : leave.status === 'approved' ? 'bg-blue-100' : 'bg-red-100'}`}>
                                            {/* Application Details */}
                                            <div className="md:w-[300px] w-full">
                                                <div className="flex justify-between mb-3">
                                                    <div className="flex items-center">
                                                        {/* Icon based on application status */}
                                                        {leave.status === 'pending' && (
                                                            <div className="shadow-lg p-2 rounded-full text-center bg-yellow-400 text-white">
                                                                <svg stroke="currentColor" fill="none" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                                    <circle cx={12} cy={12} r={10} /><polyline points="12 6 12 12 16 14" />
                                                                </svg>
                                                            </div>
                                                        )}
                                                        {leave.status === 'approved' && (
                                                            <div className="shadow-lg p-2 rounded-full text-center bg-green-400 text-white">
                                                                <svg stroke="currentColor" fill="none" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                                                </svg>
                                                            </div>
                                                        )}
                                                        {leave.status === 'rejected' && (
                                                            <div className="shadow-lg p-2 rounded-full text-center bg-red-400 text-white">
                                                                <svg stroke="currentColor" fill="none" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                                    <line x1={18} y1={6} x2={6} y2={18} />
                                                                    <line x1={6} y1={6} x2={18} y2={18} />
                                                                </svg>
                                                            </div>
                                                        )}
                                                    </div>
                                                    {/* Status indicator */}
                                                    <div className={`shadow-lg p-2 rounded-full text-xs font-bold text-center text-white ${leave.status === 'pending' ? 'bg-yellow-400' : leave.status === 'approved' ? 'bg-green-400' : 'bg-red-400'}`}>
                                                        {leave.status === 'pending' && 'Pending'}
                                                        {leave.status === 'approved' && 'Approved'}
                                                        {leave.status === 'rejected' && 'Rejected'}
                                                    </div>
                                                </div>
                                                {/* Application description */}
                                                <div className="text-xs font-light my-2">{'Application Description'}</div>
                                                <div className="flex justify-between">
                                                    {/* From Date */}
                                                    <div className="mb-2">
                                                        <div className="text-xs mb-2 font-light text-gray-700">
                                                            From Date
                                                        </div>
                                                        <div className="text-xs">
                                                            {leave.startDate}
                                                        </div>
                                                    </div>
                                                    {/* To Date */}
                                                    <div className="mb-2">
                                                        <div className="text-xs mb-2 font-light text-gray-700">
                                                            To Date
                                                        </div>
                                                        <div className="text-xs">
                                                            {leave.endDate}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Buttons for Approval/Rejection */}
                                            {leave.status === 'pending' && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-0 hover:bg-opacity-50 transition-opacity duration-300">
                                                    <button onClick={() => approveApplication(leave.id)} className="mx-1 bg-themeColor px-4 py-2 text-white rounded">
                                                        <span className="hidden md:block">Approve</span>
                                                        <span className="block md:hidden">
                                                            {/* Approval Icon */}
                                                            <svg stroke="currentColor" fill="none" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                                <polyline points="20 6 9 17 4 12" />
                                                            </svg>
                                                        </span>
                                                    </button>
                                                    <button onClick={() => rejectApplication(leave.id)} className="mx-1 bg-redColor px-4 py-2 text-white rounded">
                                                        <span className="hidden md:block">Reject</span>
                                                        <span className="block md:hidden">
                                                            {/* Rejection Icon */}
                                                            <svg stroke="currentColor" fill="none" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                                <line x1={18} y1={6} x2={6} y2={18} />
                                                                <line x1={6} y1={6} x2={18} y2={18} />
                                                            </svg>
                                                        </span>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LeaveApplicationsTemplate;
