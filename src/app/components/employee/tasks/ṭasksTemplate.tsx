import React, { useState } from "react";
import TableComponent from "@/components/TableComponent";
import { Icon } from "@iconify/react";
import { TaskTemplateInterface } from "./tasksInterface";
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css';
import { useRouter } from "next/navigation";
const TaskTemplate: React.FC<TaskTemplateInterface> = ({
  isDeleteConfirmationVisible,
  selectedTaskId,
  setModal,
  taskHistory,
  currentPage,
  totalPages,
  paginate,
  totalCount,
  OnchangeData,
  formdata,
  confirmDeleteTask,
  cancelDeleteTask,
  handleSort,
  handleFilterChange,
  filterName,
  sortOrder,
  sortColumn,
  startTask,
  endTask,
  history,
  holdTask,
  resumeTask,
  openEditPopup
}) => {
  const [currentStatus, setCurrentStatus] = useState("ALL");
  const filterOptions = ["Recently Added", "In Progress", "Completed"];
  // Filter tasks based on the current tab
  const filteredTasks: any =
    currentStatus === "ALL"
      ? taskHistory
      : taskHistory?.filter((task) => task.status === currentStatus);

  const router = useRouter();

  const handleProjectNameClick = (projectId: any) => {
    router.push(`/TaskHistoryPage?projectId=${projectId}`);
  };
  const columns = [
    {
      key: "index",
      label: "#",
      render: (item: any, index: number) => <span>{index + 1}</span>,
      sortable: false,
    },
    {
      key: "projectName", label: " Project Name", sortable: false,
      render: (task: any) => (
        <span
          onClick={() => handleProjectNameClick(task.projectId)}
          className="text-blue-500 cursor-pointer"
        >
          {task.projectName}
        </span>
      ),
    },
    { key: "createdAt", label: "Assigned Date&Time", sortable: true },
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
    { key: "estimatedTime", label: "Est. Hours", sortable: false },
    { key: "takenHours", label: "Taken Hours", sortable: false },
    {
      key: "status",
      label: "STATUS",
      render: (item: { status: any }) => {
        let colorClass = "";
        switch (item.status) {
          case "Recently Added":
            colorClass = "text-yellow-500";
            break;
          case "In Progress":
            colorClass = "text-blue-500";
            break;
          case "Completed":
            colorClass = "text-green-500";
            break;
          case "Hold":
            colorClass = "text-orange-500";
            break;
          default:
            colorClass = "text-gray-500";
        }
        return <span className={`rounded ${colorClass}`}> {item.status}</span>;
      },
      sortable: false,
    },
    {
      key: "actions",
      label: "ACTIONS",
      render: (task: { id: any; status: string }) => (
        <>
          <div className="flex">
            <button className="mr-3" onClick={() => openEditPopup(task)}>
              <Icon
                icon="flowbite:edit-outline"
                width="1.2em"
                height="1.2em"
                style={{ color: "#323232" }}
              />{" "}
            </button>
            {task.status === "Recently Added" && (
              <button className="relative group" onClick={() => startTask(task.id)}>
                <Icon
                  icon="mdi:play-circle"
                  width="1.2em"
                  height="1.2em"
                  style={{ color: "#323232" }}
                />
                <span className="absolute bottom-0 left-0 hidden mb-6 px-2 py-1 bg-black text-white text-xs rounded opacity-75 group-hover:block">
                  Start Task
                </span>
              </button>
            )}
            {task.status === "Hold" && (
              <button className="relative group" onClick={() => resumeTask(task.id)}>
                <Icon
                  icon="mdi:play-circle"
                  width="1.2em"
                  height="1.2em"
                  style={{ color: "#323232" }}
                />
                <span className="absolute bottom-0 left-0 hidden mb-6 px-2 py-1 bg-black text-white text-xs rounded opacity-75 group-hover:block">
                  Resume Task
                </span>
              </button>
            )}
            {task.status === "In Progress" && (
              <>
                <button className="relative group" onClick={() => endTask(task.id)}>
                  <Icon
                    icon="mdi:check-circle"
                    width="1.2em"
                    height="1.2em"
                    style={{ color: "#28a745" }}
                  />
                  <span className="absolute bottom-0 left-0 hidden mb-6 px-2 py-1 bg-black text-white text-xs rounded opacity-75 group-hover:block">
                    Mark as done
                  </span>
                </button>
                <button className="relative group" onClick={() => holdTask(task.id)}>
                  <Icon
                    icon="mdi:pause-circle"
                    width="1.2em"
                    height="1.2em"
                    style={{ color: "#ffc107" }}
                  />
                  <span className="absolute bottom-0 left-0 hidden mb-6 px-2 py-1 bg-black text-white text-xs rounded opacity-75 group-hover:block">
                    Put on Hold
                  </span>
                </button>
              </>
            )}
          </div>
        </>
      ),
      sortable: false,
    },
    // {
    //   key: "history",
    //   label: "History",
    //   render: (task: any) => (
    //     <div>
    //       <button
    //         onClick={() => setExpandedTaskId(expandedTaskId === task.id ? null : task.id)}
    //         className="text-blue-500"
    //       >
    //         View History
    //       </button>
    //       {expandedTaskId === task.id && ( // Condition to check if history should be displayed
    //         <div className="mt-2">
    //           <h4 className="font-semibold">Task History</h4>
    //           <ul>
    //             {taskHistory.filter(entry => entry.taskId === task.id).map((entry: any) => (
    //               <li key={entry.id}>
    //                 {entry.status} - {entry.takenHours} hours - {new Date(entry.changeTimestamp).toLocaleString()}
    //               </li>
    //             ))}
    //           </ul>
    //         </div>
    //       )}
    //     </div>
    //   ),
    //   sortable: false,
    // },
  ];

  return (
    <>
      <div>
        <div className="pb-12 pt-4 px-5 rounded-lg box-shadow mt-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="mr-4 text-lg font-medium">Filter by :</span>
              <select
                id="response"
                className="border border-gray-300 text-gray-800 text-md rounded-md block lg:p-2 p-2 md:p-2 sm:p-2 bg-slate-50"
                value={filterName}
                onChange={(e) => handleFilterChange("status", e.target.value)}
              >
                <option value="">All</option>
                {filterOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

            </div>
            <div>
              <button
                data-modal-target="authentication-modal"
                data-modal-toggle="authentication-modal"
                onClick={() => setModal((prev) => !prev)}
                className="rounded-md bg-blue-500 hover:bg-blue-400 lg:px-5 lg:py-2 md:px-5 md:py-2 sm:px-3 sm:py-2 text-white lg:text-lg focus:outline-0"
              >
                Add Task
              </button>
            </div>
          </div>

          {/*table*/}
          <div className="mt-10">
            <div className="overflow-x-auto">
              {filteredTasks.length > 0 ? (
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
              {isDeleteConfirmationVisible && (
                <div className="fixed inset-0 deletePopup overflow-y-auto flex justify-center items-center">
                  <div className="absolute inset-0 bg-black opacity-50"></div>
                  <div className="relative bg-white rounded-lg p-8">
                    <p className="text-lg font-semibold mb-4">
                      Are you sure you want to delete this task?
                    </p>
                    <div className="flex justify-end">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={() => confirmDeleteTask(selectedTaskId)}
                      >
                        Yes
                      </button>
                      <button
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                        onClick={cancelDeleteTask}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default TaskTemplate;
