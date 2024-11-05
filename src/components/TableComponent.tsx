import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import { Dropdown } from "flowbite-react";
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

  // console.log(data)
  // const initialVisibleColumns = columns.reduce((acc, column) => {
  //   if (column.visible) {
  //     acc[column.key] = true;
  //   } else {
  //     acc[column.key] = false
  //   }
  //   return acc;
  // }, {} as Record<string, boolean>);
  
  const userId=data?.[0]?.id
  // console.log(userId)
const leaveTypeId=data?.[0]?.leave_type_id

// console.log(leaveTypeId)
const storedkey=userId || leaveTypeId ?`visibleColumns.${userId}_${leaveTypeId}`: null

  const initialVisibleColumns = columns.reduce((acc, column) => {
    const storedVisibleColumns =storedkey? JSON.parse(localStorage.getItem(storedkey) || "{}"):{};
    acc[column.key] = storedVisibleColumns[column.key] ?? column.visible;
    return acc;
  }, {} as Record<string, boolean>);

  const [visibleColumns, setVisibleColumn] = useState<Record<string, boolean>>(initialVisibleColumns)


  useEffect(() => {

    if(storedkey)
      {
    localStorage.setItem(storedkey, JSON.stringify(visibleColumns));

      }
  }, [visibleColumns,storedkey]);

  const handleColumnChange = (column: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setVisibleColumn((previousState) => ({

      ...previousState,
      [column]: !previousState[column]
    }
    ))
  }

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

        <div className="flex justify-end flex-row">

          <Dropdown label="Column" style={{ backgroundColor: '#4c7ef4' }}>
            {columns.filter((column) => !column.visible).map((column) => (
              <Dropdown.Item key={column.key} >
                <input
                  type="checkbox"
                  id={column.key}
                  checked={visibleColumns[column.key] || false}
                  onClick={(e) => handleColumnChange(column.key, e)}
                  className="mx-1"
                />
                <label htmlFor={column.key} className="text-xs">{column.label}</label>
              </Dropdown.Item>
            ))}
          </Dropdown>
        </div>
        <div className=" overflow-x-auto">
          <table className="min-w-full bg-white text-left">
            <thead>
              <tr>
                {columns.filter((column) => visibleColumns[column.key])
                  .map((column) => (

                    <th
                      key={column.key}
                      className={`py-1 whitespace-nowrap px-1 border-b  cursor-pointer sortable-column ${column.sortable ? "cursor-pointer sortable-column " : ""
                        }`}
                      onClick={() => column.sortable && handleSort(column.key)}
                    // style={{ display: visibleColumns[column.key] ? "table-cell" : "none" }}
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
                  {columns.filter((column) => visibleColumns[column.key]).map((column) => (

                    <td
                      key={column.key}
                      className="py-1 px-1 border-b whitespace-nowrap"
                    // style={{ display: visibleColumns[column.key] ? "table-cell" : "none" }}
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
