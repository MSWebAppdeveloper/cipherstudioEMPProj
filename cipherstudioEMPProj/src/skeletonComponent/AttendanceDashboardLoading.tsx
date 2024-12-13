import { Skeleton } from "@/skeletonComponent/Skeleton";
import React from "react";


const AttendanceDashboardLoading = () => {
  return (
    <>

      <div className="" style={{ marginTop: "50px", marginLeft: "20px" }}>
        {/* Main Content (Reports Page Skeleton) */}

        <div className="flex flex-col ">
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="flex items-center  mb-4" key={index}>
              {/* Left Skeleton */}
              <Skeleton className="h-6 w-48 p-4 " />
              {/* Right Skeleton */}
              <Skeleton className="h-6 w-36 p-4" style={{ marginLeft: "100px" }} />
            </div>

          ))}
        </div>

        <div className="flex justify-between content-center mb-4" style={{ marginTop: "40px"}}>
          <Skeleton className="h-12 w-24 p-2" />
          <Skeleton className="h-12 w-24 p-2"  />
        </div>
        <div className="mt-8 bg-white ">
          {/* Header */}
          <div className="flex justify-between items-center mb-2">
            <div className="flex justify-start item-center ">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-24" />
            </div>
            <div className="flex ">
              <Skeleton className="h-8 w-8 " />
              <Skeleton className="h-8 w-8 " />
            </div>
          </div>

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 gap-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <Skeleton key={day} className="h-6 w-full text-center" />
            ))}
          </div>

          {/* Month Grid */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 35 }).map((_, index) => (
              <Skeleton key={index} className="h-24 w-full border border-gray-200 " />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AttendanceDashboardLoading