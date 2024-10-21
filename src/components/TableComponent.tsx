import React from "react";
import Pagination from "./Pagination";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";

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
    <div className="">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <div className=" overflow-x-auto">
          <table className="min-w-full bg-white text-left">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`py-1 whitespace-nowrap px-1 border-b  cursor-pointer sortable-column ${column.sortable ? "cursor-pointer sortable-column " : ""
                      }`}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className="flex">
                      {column.label}
                      {column.sortable && (
                        <span className="sort-icons flex items-center ml-1">
                          <Icon
                            icon="grommet-icons:ascending"
                            width="20"
                            height="20"
                            className={`${sortColumn === column.key && sortOrder === "asc"
                                ? "text-blue-500"
                                : "text-gray-400"
                              }`}
                          />
                          <Icon
                            icon="grommet-icons:descending"
                            width="20"
                            height="20"
                            className={`${sortColumn === column.key && sortOrder === "desc"
                                ? "text-blue-500"
                                : "text-gray-400"
                              }`}
                          />
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="py-1 px-1 border-b whitespace-nowrap"
                    >
                      {column.render
                        ? column.render(item, index)
                        : item[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
          formdata={formdata}
          OnchangeData={OnchangeData}
          totalCount={totalCount}
          data={data}
        />
      </motion.div>
    </div>
  );
};

export default TableComponent;
