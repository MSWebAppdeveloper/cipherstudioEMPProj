import { Skeleton } from "@/skeletonComponent/Skeleton";
import React from "react";


const LeaveRequestLoading = () => {
    return (
        <>

            <div className="flex flex">
                {/* Main Content (Reports Page Skeleton) */}
                <div className="flex-1 p-6">
                    <div className="flex justify-between items-center " style={{ marginBottom: "60px" }}>
                        <div className="flex space-x-4">
                            <Skeleton className="h-12 mx-8 w-48" />
                        </div>
                        <Skeleton className="h-12 w-56" />
                    </div>
                    <div className="flex flex-wrap -m-1 mt-3" style={{marginBottom:"30px"}}>
                        {/* Card Skeleton */}
                        {Array.from({ length: 3 }).map((_, id) => (
                            <div
                                key={id}
                                className="w-full sm:w-1/2 lg:w-1/3 md:w-1/2 flex flex-col p-3"
                            >
                                <div
                                    className="bg-gray-300 opacity-75 rounded-lg overflow-hidden flex-1 flex flex-col"
                                >
                                    <div className="px-3 py-3 flex-1 flex flex-col">
                                        <div className="flex justify-between">
                                            <div className="px-3">
                                                {/* Skeleton for the card title */}
                                                <Skeleton className="h-6 w-48" />
                                            </div>
                                            <div className="mb-3 mt-1 text-grey-darker text-sm flex-1 px-6">
                                                <ul className="space-y-2">
                                                    {/* Skeleton for the list items */}
                                                    <li className="text-lg flex justify-between">
                                                        <Skeleton className="h-5 w-44 p-3" />
                                                    </li>
                                                    <li className="text-lg flex justify-between">
                                                        <Skeleton className="h-5 w-44 p-3" />
                                                    </li>
                                                    <li className="text-lg flex justify-between">
                                                        <Skeleton className="h-5 w-44 p-3" />
                                                    </li>
                                                    <li className="text-lg flex justify-between">
                                                        <Skeleton className="h-5 w-44 p-3" />
                                                    </li>
                                                    <li className="text-lg flex justify-between">
                                                        <Skeleton className="h-5 w-44 p-3" />
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between items-center " style={{ marginTop: "90px" }}>
                        <div className="flex space-x-4">
                            <Skeleton className="h-12 mx-8 w-48" />
                        </div>
                      
                    </div>
                    {/* Table Header */}
                    <div className="grid grid-cols-5 gap-5 mb-3" style={{marginTop:"60px"}} >
                        <Skeleton className="h-8 w-full px-4 py-2" />
                        <Skeleton className="h-8 w-full px-4 py-2" />
                        <Skeleton className="h-8 w-full px-4 py-2" />
                        <Skeleton className="h-8 w-full px-4 py-2" />
                        <Skeleton className="h-8 w-full px-4 py-2" />

                    </div>
                    {/* Table Rows */}
                    <div className="space-y-2">
                        {Array(10)
                            .fill(null)
                            .map((_, idx) => (
                                <div key={idx} className="grid grid-cols-5 gap-4">
                                    <Skeleton className="h-6 w-full  px-2 py-3" />
                                    <Skeleton className="h-6 w-full  px-2 py-3" />
                                    <Skeleton className="h-6 w-full  px-2 py-3" />
                                    <Skeleton className="h-6 w-full  px-2 py-3" />
                                    <Skeleton className="h-6 w-full  px-2 py-3" />
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default LeaveRequestLoading;
