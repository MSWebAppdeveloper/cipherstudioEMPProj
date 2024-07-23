"use client";
import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios for making HTTP requests

import { deleteUser } from "@/services/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { TaskTemplateInterface } from "./tasksInterface";
import TaskTemplate from "./ṭasksTemplate";
import TasksFormComponent from "../tasksForm/page";

const TaskComponent: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [isModal, setModal] = useState<boolean>(false);
  const [taskHistory, setTaskHistory] = useState<TaskTemplateInterface[]>([]);
  const [formdata, setFormdata] = useState({
    limit: "10",
    order: "",
    year: "",
    status: "",
  });
  const [filterType, setFilterType] = useState<"status">("status");
  const [filterValue, setFilterValue] = useState<string | [string, string]>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [taskTypes, setTaskTypes] = useState([]);
  const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState<boolean>(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number>();

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [sortColumn, setSortColumn] = useState<string>("createdAt");
  const router = useRouter();

  useEffect(() => {
    // Fetch all tasks from the server when the component mounts
    fetchTaskHistory(currentPage);
  }, [
    filterValue,
    isModal,
    currentPage,
    formdata.limit,
    formdata.order,
    formdata.year,
    sortColumn,
    sortOrder,
  ]);

  const OnchangeData = (e: any) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await fetch(
      "http://192.168.1.2:8082/api/employee/refresh",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      }
    );

    if (response.ok) {
      const { accessToken: newAccessToken } = await response.json();
      localStorage.setItem("accessToken", newAccessToken);
      return newAccessToken;
    } else {
      throw new Error("Failed to refresh token");
    }
  };

  const fetchTaskHistory = async (page: number) => {
    try {
      let UserId = localStorage.getItem("UserId");
      let accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Token not found. Redirect to login page.");
        return;
      }

      const response = await fetch(
        `http://192.168.1.2:8082/api/tasks/${UserId}?page=${page}&limit=${formdata.limit}&sortColumn=${sortColumn}&sortOrder=${sortOrder}&status=${filterValue}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const userDetails = await response.json();
        setTaskHistory(userDetails.data);
        setTotalPages(userDetails.totalPages);
        setTotalCount(userDetails.totalCount);
      } else if (response.status === 401) {
        try {
          const newAccessToken = await refreshToken();
          if (newAccessToken) {
            fetchTaskHistory(page); // Retry fetching with the new token
          }
        } catch (error) {
          console.error("Failed to refresh token. Redirect to login page.");
          await signOut({
            callbackUrl: "/login",
            redirect: false,
          });
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("UserId");
          localStorage.removeItem("name");
          localStorage.removeItem("token");
          localStorage.removeItem("userRole");
          toast.success("Login Again");
          router.push("/login");
        }
      } else {
        console.error("Failed to fetch user details");
      }
    } catch (error: any) {
      console.error("Error fetching user details:", error.message);
    }
  };

  const openEditPopup = (task: any) => {
    setSelectedTask(task);
    setModal(true);
  };

  const handleEditTaskUpdate = () => {
    setModal(false);
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

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const deleteUserHandler = async (taskId: number) => {
    setSelectedTaskId(taskId);
    setDeleteConfirmationVisible(true);
  };

  const cancelDeleteUser = () => {
    setDeleteConfirmationVisible(false);
  };

  const handleSort = (column: string) => {
    const order = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(order);
    setSortColumn(column);
  };

  const handleFilterChange = (
    type: "status",
    value: string | [string, string]
  ) => {
    setFilterType(type);
    setFilterValue(value);
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
        openEditPopup={openEditPopup}
        setModal={setModal}
        taskHistory={taskHistory}
        onDelete={handleDelete}
        taskType={""}

        description={""}
        status={""}
        id={""}
        filterName={filterType === "status" ? (filterValue as string) : ""}
        setFilterName={(value: any) => setFilterValue(value)}
        handleFilterChange={handleFilterChange}
        deleteSelected={deleteUserHandler}
        confirmDeleteTask={handleDelete}
        cancelDeleteTask={cancelDeleteUser}
        selectedTaskId={selectedTaskId}
        isDeleteConfirmationVisible={isDeleteConfirmationVisible}
        currentPage={currentPage}
        paginate={paginate}
        totalPages={totalPages}
        totalRecords={totalRecords}
        totalCount={totalCount}
        OnchangeData={OnchangeData}
        formdata={formdata}
        taskTypes={taskTypes}
        createdAt={undefined}
        handleSort={handleSort}
        sortOrder={sortOrder}
        sortColumn={sortColumn}

      />
    </>
  );
};

export default TaskComponent;
