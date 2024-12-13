import { Skeleton } from "@/skeletonComponent/Skeleton";
import React from "react";


const RuleForCalanderLoading = () => {
  return (
    <>
      <div className="flex flex">
        {/* Sidebar Skeleton */}

        <div className="w-96 h-screen border-r border-gray-200 p-4">
          {/* Sidebar Items */}
          <div className="space-y-3">
            <Skeleton className="h-6 w-full px-4 py-5" />
          </div>
        </div>
        {/* Main Content (Reports Page Skeleton) */}
        <div className="flex-1 p-6">
          <div className="" style={{marginBottom:"20px"}}>
            <div className="">
              <Skeleton className="h-12 w-48" />
            </div>
          </div>
          <div className="">
              <Skeleton className="h-12 w-96" />
            </div>
        </div>
      </div>
    </>
  );
};

export default RuleForCalanderLoading;
