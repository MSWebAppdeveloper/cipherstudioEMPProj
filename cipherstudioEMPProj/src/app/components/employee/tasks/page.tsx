"use client";
import React, { useEffect, useState } from "react";
import { deleteUser } from "@/services/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { TaskTemplateInterface } from "./tasksInterface";
import TaskTemplate from "./tasksTemplate";
import TasksFormComponent from "../tasksForm/page";
import CommentPopup from "@/components/CommentPopup";

const TaskComponent: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [isModal, setModal] = useState<boolean>(false);
  const [isCommentPopupOpen, setCommentPopupOpen] = useState<boolean>(false); // State for comment popup

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
  const [history, setHistory] = useState<any[]>([]); // Updated to any[] for better type handling
  const [selectedTaskForHistory, setSelectedTaskForHistory] = useState<any>(null); // State for task history modal


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


  // useEffect(() => {
  //   async function fetchHistory() {
  //     try {
  //       const response = await fetch(`http://192.168.1.5:8080/api/tasks/${selectedTaskId}/history`);
  //       const data = await response.json();
  //       setHistory(data);
  //     } catch (error) {
  //       console.error('Error fetching task history:', error);
  //     }
  //   }

  //   fetchHistory();
  // }, [selectedTaskId]);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await fetch(
      "http://192.168.1.5:8080/api/employee/refresh",
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
      const UserId = localStorage.getItem("UserId");
      const userName = localStorage.getItem("name");
      let accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Token not found. Redirect to login page.");
        return;
      }

      const response = await fetch(
        `http://192.168.1.5:8080/api/tasks/${UserId}?userName=${userName}&page=${page}&limit=${formdata.limit}&sortColumn=${sortColumn}&sortOrder=${sortOrder}&status=${filterValue}`,
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

        setTaskHistory(userDetails.data)

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

  const holdTask = (task: any) => {
    setSelectedTask(task);
    setCommentPopupOpen(true); // Open the comment popup
  };

  const handleEditTaskUpdate = () => {
    setModal(false);
  };

  const startTask = async (taskId: any) => {
    try {
      const response = await fetch(`http://192.168.1.5:8080/api/tasks/${taskId}/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'In Progress' }),
      });

      if (!response.ok) {
        throw new Error('Failed to start the task');
      }

      const updatedTask = await response.json();

      // Update the UI to reflect the changes
      fetchTaskHistory(currentPage);
      toast.success('Task started successfully');
    } catch (error) {
      console.error('Error starting task:', error);
    }
  };

  const endTask = async (taskId: any) => {
    try {
      const response = await fetch(`http://192.168.1.5:8080/api/tasks/${taskId}/end`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Completed' }),
      });

      if (!response.ok) {
        throw new Error('Failed to end the task');
      }

      const updatedTask = await response.json();
      // Update the UI to reflect the changes
      fetchTaskHistory(currentPage);
      toast.success('Task Completed successfully');
    } catch (error) {
      console.error('Error starting task:', error);
    }
  };

  // const holdTask = async (taskId: any) => {
  //   try {
  //     const response = await fetch(`http://192.168.1.5:8080/api/tasks/${taskId}/hold`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ status: 'Hold' }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to Hold the task');
  //     }

  //     const updatedTask = await response.json();
  //     // Update the UI to reflect the changes
  //     fetchTaskHistory(currentPage);
  //     toast.success('Task on Hold');
  //   } catch (error) {
  //     console.error('Error to hold task:', error);
  //   }
  // };
  const handleCommentSubmit = async (comment: string, taskId: number) => {
    try {
      const response = await fetch(`http://192.168.1.5:8080/api/tasks/${taskId}/hold`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Hold', comment }), // Include comment in the request
      });

      if (!response.ok) {
        throw new Error('Failed to hold the task');
      }

      const updatedTask = await response.json();
      fetchTaskHistory(currentPage); // Refresh task history
      toast.success('Task on Hold');
    } catch (error) {
      console.error('Error to hold task:', error);
    } finally {
      setCommentPopupOpen(false); // Close the popup after submission
    }
  };

  const resumeTask = async (taskId: any) => {
    try {
      const response = await fetch(`http://192.168.1.5:8080/api/tasks/${taskId}/resume`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'In Progress' }),
      });

      if (!response.ok) {
        throw new Error('Failed to resume the task');
      }

      const updatedTask = await response.json();
      // Update the UI to reflect the changes
      fetchTaskHistory(currentPage);
      toast.success('Task Resumed');
    } catch (error) {
      console.error('Error to resume task:', error);
    }
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
      <CommentPopup
        isOpen={isCommentPopupOpen}
        task={selectedTask}
        onClose={() => setCommentPopupOpen(false)}
        onSubmit={handleCommentSubmit}
      />

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
        startTask={startTask}
        endTask={endTask}
        history={history}
        holdTask={holdTask}
        resumeTask={resumeTask}
      />
    </>
  );
};

export default TaskComponent;
