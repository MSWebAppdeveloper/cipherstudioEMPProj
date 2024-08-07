"use client";
import React, { useEffect, useState, useRef } from "react";
import { deleteUser, HistoryTask, UserDetails } from "@/services/api";

import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import TaskTemplate from "./tasksTemplate";
import { TaskInterface } from "./tasksInterface";
import TasksFormComponent from "../../employee/tasksForm/page";

const TaskComponent: React.FC = () => {
  const [taskHistory, setTaskHistory] = useState<TaskInterface[]>([]);
  const [filterValue, setFilterValue] = useState<[string, string]>(["", ""]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [formdata, setFormdata] = useState({
    limit: "10",
    order: "",
    status: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [isModal, setModal] = useState<boolean>(false);
  const [sortColumn, setSortColumn] = useState<string>("createdAt");
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState<boolean>(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number>();
  const [isDataFetched, setIsDataFetched] = useState(false);

  const router = useRouter();

  const OnchangeData = (e: any) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    getAllUsers(currentPage);
  }, []);

  const getAllUsers = async (page: number) => {
    try {
      const url = `employee/users?&order=${formdata.order}`;
      const response: any = await UserDetails(url);
      setAllUsers(response.data.filter((user: any) => user.isActive === true));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filterValue, formdata.limit, formdata.order]);

  const fetchTaskHistory = async (page: number, forDownload = false) => {
    try {
      const statusFilter = `&status=${filterValue[0]}`;
      const nameFilter = filterValue[1] ? `&name=${filterValue[1]}` : "";
      const limit = forDownload ? "" : `&limit=${formdata.limit}`;

      const url = `tasks?page=${page}&order=${formdata.order}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`;

      const response: any = await HistoryTask(
        url + limit + nameFilter + statusFilter
      ); 
      setTaskHistory(response.data.data ?? []);
      setTotalPages(response.data.totalPages ?? 0);
      setTotalCount(response.data.totalCount ?? 0);
    } catch (error) {
      console.error("Error fetching task history:", error);
    }
  };


  const fetchTasksByStatus = async (status: string) => {
    try {
      const statusFilter = status !== "ALL" ? `&status=${status}` : "";
      const url = `tasks?page=${currentPage}&order=${formdata.order}&sortColumn=${sortColumn}&sortOrder=${sortOrder}${statusFilter}`;
      const response: any = await HistoryTask(url);
      setTaskHistory(response.data.data ?? []);
      setTotalPages(response.data.totalPages ?? 0);
      setTotalCount(response.data.totalCount ?? 0);
    } catch (error) {
      console.error("Error fetching tasks by status:", error);
    }
  };

  useEffect(() => {
    fetchTaskHistory(currentPage);
  }, [
    filterValue,
    isModal,
    currentPage,
    formdata.limit,
    formdata.order,
    sortColumn,
    sortOrder,
  ]);


  const handleFilterChange = (type: "status" | "name", value: string) => {
    setFilterValue((prevValue) => {
      return type === "status" ? [value, prevValue[1]] : [prevValue[0], value];
    });
  };

  const openEditPopup = (task: any) => {
    setSelectedTask(task);
    setModal(true);
  };

  const handleSort = (column: string) => {
    const order = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(order);
    setSortColumn(column);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const fetchAllRecords = async () => {
    setIsLoading(true);
    await fetchTaskHistory(1, true);
  };

  const handleEditTaskUpdate = () => {
    setModal(false);
  };
  const deleteUserHandler = async (taskId: number) => {
    setSelectedTaskId(taskId);
    setDeleteConfirmationVisible(true);
  };

  const handleDelete = async (deletedTaskId: any) => {
    try {
      const response = await deleteUser(`tasks/${deletedTaskId}`);

      if (response.status === 200) {
        const updatedTaskHistory = taskHistory.filter(
          (item) => item.id !== deletedTaskId
        );
        setTaskHistory(updatedTaskHistory);
        toast.success("Task deleted successfully!");
        fetchTaskHistory(currentPage);
      } else {
        console.error("Delete failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Failed to delete task!");
    } finally {
      setDeleteConfirmationVisible(false);
    }
  };
  const cancelDeleteUser = () => {
    setDeleteConfirmationVisible(false);
  };

  return (
    <>
      <TasksFormComponent
        isModal={isModal}
        handleClose={() => setModal(false)}
        task={selectedTask}
        onUpdate={handleEditTaskUpdate}
      />
      <TaskTemplate
        taskHistory={taskHistory}
        setModal={setModal}
        filterStatus={filterValue[0]}
        filterName={filterValue[1]}
        setFilterName={(value: any) => setFilterValue(value)}
        allUsers={allUsers}
        currentPage={currentPage}
        paginate={paginate}
        totalPages={totalPages}
        totalRecords={totalRecords}
        totalCount={totalCount}
        OnchangeData={OnchangeData}
        formdata={formdata}
        handleFilterChange={handleFilterChange}
        handleSort={handleSort}
        sortOrder={sortOrder}
        sortColumn={sortColumn}
        isLoading={isLoading}
        fetchAllRecords={fetchAllRecords}
        isDataFetched={isDataFetched}
        setIsDataFetched={setIsDataFetched}
        openEditPopup={openEditPopup}
        deleteSelected={deleteUserHandler}
        confirmDeleteTask={handleDelete}
        cancelDeleteTask={cancelDeleteUser}
        isDeleteConfirmationVisible={isDeleteConfirmationVisible}
        selectedTaskId={selectedTaskId}
        fetchTasksByStatus={fetchTasksByStatus}
      />
    </>
  );
};

export default TaskComponent;
