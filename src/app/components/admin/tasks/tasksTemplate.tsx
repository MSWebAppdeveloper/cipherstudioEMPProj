import React, { useEffect, useRef, useState } from "react";

import TableComponent from "@/components/TableComponent";
import { TaskInterface, TaskTemplateProps } from "./tasksInterface";
import { Tooltip } from "react-tooltip";



const TaskTemplate: React.FC<TaskTemplateProps> = ({
  taskHistory,

  handleFilterChange,
filterName,
  filterStatus,
  currentPage,
  totalPages,
  paginate,
  totalCount,
  OnchangeData,
  formdata,
  handleSort,
  sortOrder,
  sortColumn,
  allUsers,
  isDataFetched,
  setIsDataFetched,
}) => {
  const [currentStatus, setCurrentStatus] = useState("ALL");
  const csvLinkRef = useRef(null);

  const getUserNames = () => {
    return allUsers.map((user) => user.name);
  };

 

  useEffect(() => {
    if (isDataFetched && csvLinkRef.current) {
      (csvLinkRef.current as any).link.click();
      setIsDataFetched(false);
    }
  }, [isDataFetched]);

  const filterOptions = ["Pending", "In Progress", "Completed"];
  const filteredTasks: any =
    currentStatus === "ALL"
      ? taskHistory ?? []
      : taskHistory?.filter((task) => task.status === currentStatus) ?? [];

  const columns = [
    {
      key: "index",
      label: "#",
      render: (item: any, index: number) => <span>{index + 1}</span>,
      sortable: false,
    },
    { key: "userName", label: "NAME", sortable: true },
    { key: "projectName", label: " Project Name", sortable: false },
    { key: "createdAt", label: "Created Date&Time", sortable: true },
    { key: "title", label: "Title", sortable: false },
    {
      key: "description",
      label: "Description",
      sortable: false,
      render: (task: any) => (
        <div>
          <span 
            data-tooltip-id={`descriptionTooltip-${task.id}`} 
            data-tooltip-content={task.description} 
            className={`truncate`}
          >
            {task.description.length > 50 ? `${task.description.substring(0, 50)}...` : task.description}
          </span>
          {task.description.length > 50 && (
            <Tooltip id={`descriptionTooltip-${task.id}`} className="custom-tooltip" />
          )}
        </div>
      ),
    },
    { key: "estimatedTime", label: "Est. Time", sortable: false },
    { key: "timeTaken", label: "Taken Time", sortable: false },
    {
      key: "status",
      label: "STATUS",
      render: (item: { status: any }) => {
        let colorClass = "";
        switch (item.status) {
          case "Pending":
            colorClass = "text-yellow-500";
            break;
          case "In Progress":
            colorClass = "text-blue-500";
            break;
          case "Completed":
            colorClass = "text-green-500";
            break;
          default:
            colorClass = "text-gray-500";
        }
        return <span className={` rounded ${colorClass}`}> {item.status}</span>;
      },
      sortable: false,
    },
  ];

  return (
    <>
      <div>
        <div className="p-5 box-shadow rounded-md mt-4 lg:px-8 lg:py-8">
          <div className="flex justify-between items-end flex-wrap gap-2">
            <div>
              <div className="flex space-x-4 items-end">
                <form className="max-w-52">
                  <p className="font-medium pb-2">Filter by :</p>
                  <select
                    id="response"
                    className="border border-gray-300 text-gray-800 text-md rounded-md block lg:p-2 p-2 md:p-2 sm:p-2 bg-slate-50"
                    value={filterStatus}
                    onChange={(e) =>
                      handleFilterChange("status", e.target.value)
                    }
                  >
                    <option value="">All</option>
                    {filterOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </form>
                <form className="max-w-52">
                  <select
                    id="name"
                    className="border border-gray-300 text-gray-800 text-md rounded-md block lg:p-2 p-2 md:p-2 sm:p-2 bg-slate-50"
                    value={filterName}
                    onChange={(e) => handleFilterChange("name", e.target.value)}
                  >
                    <option value="">Select User</option>
                    {getUserNames().map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </form>
              </div>
            </div>
          </div>
          <div className="mt-10">
            {filteredTasks?.length > 0 ? (
              <TableComponent
                data={filteredTasks}
                columns={columns}
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={paginate}
                totalCount={totalCount}
                OnchangeData={OnchangeData}
                formdata={formdata}
                handleSort={handleSort}
                sortOrder={sortOrder}
                sortColumn={sortColumn}
              />
            ) : (
              <p>No Task data available.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskTemplate;
