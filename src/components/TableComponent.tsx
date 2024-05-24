import React from "react";

interface TableProps {
  columns: { key: string; label: string }[];
  data: any[];
  renderRow: (item: any, index: number) => React.ReactNode;
}

const TableComponent: React.FC<TableProps> = ({ columns, data, renderRow }) => {
  return (
    <div className="overflow-x-auto">
      {data.length > 0 ? (
        <table className="table-auto w-full">
          <thead className="text-lg font-semibold uppercase text-gray-800 bg-gray-50 text-left">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="p-2 whitespace-nowrap">
                  <div className="font-semibold">{column.label}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-lg divide-y divide-gray-100">
            {data.map((item, index) => renderRow(item, index))}
          </tbody>
        </table>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default TableComponent;
