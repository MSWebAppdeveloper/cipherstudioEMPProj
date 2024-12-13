"use client";
import React, { useEffect, useState } from "react";
import { deleteUser, HistoryTask, UserDetails } from "@/services/api";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import TaskTemplate from "./tasksTemplate";
import { TaskInterface } from "./tasksInterface";
import TasksFormComponent from "../../employee/tasksForm/page";
import TaskLoading from "@/skeletonComponent/TaskLoading";

const TaskComponent: React.FC = () => {
  const [taskHistory, setTaskHistory] = useState<TaskInterface[]>([]);
  const [downloadData, setDownloadData] = useState<TaskInterface[]>([]);

  const [filterValue, setFilterValue] = useState<string | [string, string] |any>("");
  const [filterType, setFilterType] = useState<"name" | "date" |"columns">("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [formdata, setFormdata] = useState({
    limit: "10",
    order: "",
    status: "ALL",
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
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

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

  const fetchTasksByStatus = async (page: number, status: string, forDownload = false) => {

    try {
      const statusFilter = formdata.status !== "ALL" ? `&status=${formdata.status}` : "";
      const nameFilter = filterValue ? `&name=${filterValue}` : "";
      const limit = forDownload ? "" : `&limit=${formdata.limit}`;
      const dateFilter = startDate && endDate
        ? `&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
        : "";
      const downloadFlag = forDownload ? "&forDownload=true" : "";
      const url = `tasks?page=${page}&status=${status}&order=${formdata.order}&sortColumn=${sortColumn}&sortOrder=${sortOrder}${statusFilter}`;
      const response: any = await HistoryTask(url + nameFilter + limit + dateFilter + downloadFlag);
      if (forDownload) {
        setDownloadData(response.data);
        setIsLoading(false);
      }
      setTaskHistory(response.data.data ?? []);
      setTotalPages(response.data.totalPages ?? 0);
      setTotalCount(response.data.totalCount ?? 0);
    } catch (error) {
      console.error("Error fetching tasks by status:", error);
    }
  };

  useEffect(() => {
    fetchTasksByStatus(currentPage, status);
  }, [
    filterValue,
    isModal,
    currentPage,
    formdata.limit,
    formdata.order,
    startDate,
    endDate,
    sortColumn,
    sortOrder,
  ]);

  const handleFilterChange = (
    type: "name" | "date"| "columns",
    value: string | [string, string] |any
  ) => {
    setFilterType(type);
    setFilterValue(value);
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
    await fetchTasksByStatus(1, status, true);
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
        fetchTasksByStatus(currentPage, status);
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

  useEffect (()=>{
    setIsLoading(true);
    const timer =setTimeout(()=>setIsLoading(false),1000)
    return()=>clearTimeout(timer)
  },[])
  if(isLoading) {
  return <TaskLoading/>
  }
  

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
        filterName={filterType === "name" ? (filterValue as string) : ""}
        setFilterName={(value: any) => setFilterValue(value)}
        allUsers={allUsers}
        downloadData={downloadData}
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
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      
      />
    </>
  );
};

export default TaskComponent;
