import React from "react";

interface TableComponentProps {
  columns: any[];
  data: any[];
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
  totalCount: number;
  nameOptions: string[];
  filterName: string;
  setFilterName: (value: any) => void;
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
  nameOptions,
  filterName,
  setFilterName,
  OnchangeData,
  formdata,
  handleSort, 
  sortOrder, 
  sortColumn,

}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`py-2 px-4 border-b ${
                  column.sortable ? "cursor-pointer" : ""
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

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md ${
            currentPage === 1 ? "bg-gray-200 cursor-not-allowed" : "bg-blue-500 text-white"
          }`}
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md ${
            currentPage === totalPages ? "bg-gray-200 cursor-not-allowed" : "bg-blue-500 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableComponent;
