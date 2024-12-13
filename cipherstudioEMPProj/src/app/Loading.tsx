import { Skeleton } from "@/skeletonComponent/Skeleton";
import React from "react";


const Loading = () => {
  return (
    <>
      <div className="w-full mb-6">
        <Skeleton className="h-24 w-full" />
      </div>
      <div className="flex flex">
        {/* Sidebar Skeleton */}

        <div className="w-52 h-screen border-r border-gray-200 p-4">
          {/* Sidebar Items */}
          <div className="space-y-3">
            <Skeleton className="h-6 w-40 p-3" />
            <Skeleton className="h-6 w-40 p-3" />
            <Skeleton className="h-6 w-40 p-3" />
            <Skeleton className="h-6 w-40 p-3" />
            <Skeleton className="h-6 w-40 p-3" />
            <Skeleton className="h-6 w-40 p-3" />
            <Skeleton className="h-6 w-40 p-3" />

          </div>
        </div>

        {/* Main Content (Reports Page Skeleton) */}
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center " style={{marginBottom:"60px"}}>
            <div className="flex space-x-4">
              <Skeleton className="h-12 mx-8 w-48" />
              <Skeleton className="h-12 mx-8 w-44" />
            </div>
            <Skeleton className="h-12 w-56" />
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-5 gap-5 mb-3">
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

export default Loading;
