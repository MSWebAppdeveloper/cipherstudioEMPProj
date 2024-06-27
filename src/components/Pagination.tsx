import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
  formdata: FormData;
  OnchangeData: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  totalCount: number;
  data: any[];
}

interface FormData {
  limit: number;
  order: string;
  status: any;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  paginate,
  formdata,
  OnchangeData,
  totalCount,
  data,
}) => {
  const pageNumbers: number[] = [];

  const maxVisiblePages = 5; // Change this value as needed

  // Calculate the range of pages to display
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  // Adjust startPage and endPage if needed
  if (totalPages - endPage < Math.floor(maxVisiblePages / 2)) {
    startPage = Math.max(1, totalPages - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="flex justify-between items-center mt-4 pagination-tbl">
        <div>
          <label htmlFor="limit" className="mr-2">
            Items per page:
          </label>
          <select
            name="limit"
            id="limit"
            value={formdata.limit}
            onChange={OnchangeData}
            className="border border-gray-300 rounded-md p-1 "
          >
            <option aria-placeholder="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
        </div>
        <span>
          {/* Page {currentPage} of {totalPages}  */}
          Showing{" "}
          <span className="font-medium">
            {currentPage === 1 ? 1 : (currentPage - 1) * formdata.limit + 1}
          </span>{" "}
          to{" "}
          <span className="font-medium">
            {currentPage === totalPages
              ? (currentPage - 1) * formdata.limit + data.length
              : currentPage * formdata.limit}
          </span>{" "}
          of <span className="font-medium">{totalCount}</span> results
        </span>

        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 
                 ${
                   currentPage === 1
                     ? "bg-gray-200 cursor-not-allowed"
                     : "bg-gray-500 text-black"
                 }
             text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-400 focus:z-20 focus:outline-offset-0`}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {pageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => paginate(pageNumber)}
                className={`relative inline-flex items-center px-4 py-2  font-semibold ${
                  pageNumber === currentPage
                    ? "bg-blue-500 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                    : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                }`}
              >
                {pageNumber}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 ${
                currentPage === totalPages
                  ? "bg-gray-200 cursor-not-allowed"
                  : "bg-gray-500 text-black"
              } text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-400  focus:z-20 focus:outline-offset-0`}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Pagination;