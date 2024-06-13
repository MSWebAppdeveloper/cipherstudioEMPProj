import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import React from "react";
import Pagination from "./Pagination";

interface TableComponentProps {
  columns: any[];
  data: any[];
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
  totalCount: number;

  OnchangeData: (e: any) => void;
  formdata: any;
  handleSort: (column: string) => void;
  sortOrder: "asc" | "desc";
  sortColumn: string;
}

const TableComponent: React.FC<TableComponentProps> = ({
  columns,
  data,
  currentPage,
  totalPages,
  paginate,
  totalCount,
 
  OnchangeData,
  formdata,
  handleSort,
  sortOrder,
  sortColumn,

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
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white text-left">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`py-2 px-4 border-b ${column.sortable ? "cursor-pointer" : ""
                  }`}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                {column.label}
                {column.sortable && (
                  <span>
                    {sortColumn === column.key && sortOrder === "asc" ? " 🔼" : ""}
                    {sortColumn === column.key && sortOrder === "desc" ? " 🔽" : ""}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.key} className="py-2 px-4 border-b">
                  {column.render ? column.render(item, index) : item[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
        formdata={formdata}
        OnchangeData={OnchangeData}
        totalCount={totalCount}
        data={data} />

    </div>
  );
};

export default TableComponent;
