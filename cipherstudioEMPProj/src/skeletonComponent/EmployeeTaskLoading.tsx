import { Skeleton } from "@/skeletonComponent/Skeleton";
import React from "react";


const EmployeeTaskLoading = () => {
  return (
    <>
      <div className="flex flex">

        <div className="flex-1  ">
          <div className="flex justify-between items-center" style={{marginBottom:"50px",marginTop:"60px"}}>
            <div className="flex space-x-4">
              <Skeleton className="h-12  w-40 " />
            </div>
            <Skeleton className="h-12 w-40" />
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

export default EmployeeTaskLoading;
