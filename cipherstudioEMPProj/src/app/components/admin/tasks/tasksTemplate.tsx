import React, { useEffect, useRef, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { motion } from "framer-motion";
import TableComponent from "@/components/TableComponent";
import { TaskInterface, TaskTemplateProps } from "./tasksInterface";
import { Tooltip } from "react-tooltip";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";

const TaskTemplate: React.FC<TaskTemplateProps> = ({
  taskHistory,
  setModal,
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
  openEditPopup,
  deleteSelected,
  isDeleteConfirmationVisible,
  confirmDeleteTask,
  cancelDeleteTask,
  selectedTaskId,
  fetchTasksByStatus,
}) => {
  const [currentStatus, setCurrentStatus] = useState("ALL");
  const csvLinkRef = useRef(null);
  const router = useRouter();

  const handleProjectNameClick = (taskId: any, projectName: string) => {
    router.push(`/employee/TaskHistoryPage?taskId=${taskId}&projectName=${projectName}`);
  };

  const getUserNames = () => {
    return allUsers.map((user) => user.name);
  };

  useEffect(() => {
    // Fetch tasks whenever the currentStatus changes
    fetchTasksByStatus(currentStatus);
  }, [currentStatus]);

  useEffect(() => {
    if (isDataFetched && csvLinkRef.current) {
      (csvLinkRef.current as any).link.click();
      setIsDataFetched(false);
    }
  }, [isDataFetched]);

  const filterOptions = ["ALL", "Recently Added", "In Progress", "Completed", "Hold"];
 const filteredTasks = taskHistory ?? [];

  const columns = [
    {
      key: "index",
      label: "#",
      render: (item: any, index: number) => <span>{index + 1}</span>,
      sortable: false,
    },
    { key: "userName", label: "Created By", sortable: true },
    {
      key: "projectName",
      label: " Project Name",
      sortable: false,
      render: (task: any) => (
        <span
          onClick={() => handleProjectNameClick(task.id, task.projectName)}
          className="text-blue-500 cursor-pointer"
        >
          {task.projectName}
        </span>
      ),
    },
    { key: "assignedTo", label: "Assigned to", render: (project: { assignedTo: string[] }) => (
      <span>{project.assignedTo.join(", ")}</span> // Display as a comma-separated list
  ),
  sortable: false,},

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
    { key: "takenTime", label: "Taken Time", sortable: false },
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
        return <span className={`rounded ${colorClass}`}>{item.status}</span>;
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
            <button
              className=""
              onClick={() => deleteSelected(task.id)}
            >
              <Icon
                icon="mi:delete"
                width="1.2em"
                height="1.2em"
                style={{ color: "#323232" }}
              />{" "}
            </button>
          </div>
        </>
      ),
      sortable: false,
    },
  ];

  return (
    <div className="p-5 box-shadow rounded-md mt-4 lg:px-8 lg:py-8 bg-white">
      <div className="flex justify-between items-end flex-wrap gap-2">
        <div>
          <div className="flex space-x-4 items-end">
            <form className="max-w-52">
              <p className="font-medium pb-2">Filter by :</p>
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
        <div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-modal-target="authentication-modal"
            data-modal-toggle="authentication-modal"
            onClick={() => setModal((prev) => !prev)}
            className="rounded-md bg-blue-500 hover:bg-blue-400 lg:px-5 lg:py-2 md:px-5 md:py-2 sm:px-3 sm:py-2 text-white lg:text-lg focus:outline-0"
          >
            Add Task
          </motion.button>
        </div>
      </div>
      <div className="mt-10">
        <Tabs>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>

            <TabList className="flex space-x-4 border-b">
              
              {filterOptions.map((option) => (
                <Tab
                  key={option}
                  onClick={() => setCurrentStatus(option)}
                  className="cursor-pointer py-2 px-4 transition-colors duration-300 ease-in-out border-b-2"
                  selectedClassName="border-blue-500 text-blue-500"
                >
                  {option}
                </Tab>
              ))}
            </TabList>
            {filterOptions.map((option) => (
              <TabPanel key={option} className="mt-4">
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
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-gray-500"
                  >
                    No Task data available.
                  </motion.p>
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
              </TabPanel>
            ))}
          </motion.div>
        </Tabs>
      </div>
    </div>
  );
};

export default TaskTemplate;
