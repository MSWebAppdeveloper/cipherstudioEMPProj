"use client";
import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios for making HTTP requests

import RequestTemplate from "./RequestTemplate";
import LeaveRequestComponent from "../leaverequest/page";
import { RequestInterface } from "./RequestInterface";
import { LeaveTypes, deleteUser } from "@/services/api";
import toast from "react-hot-toast";

const RequestComponent: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isModal, setModal] = useState<boolean>(false);
  const [leaveHistory, setLeaveHistory] = useState<RequestInterface[]>([]);
  const [formdata, setFormdata] = useState({
    limit: "12",
    order: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<number>();

  useEffect(() => {
    // Fetch all users from the server when the component mounts

    fetchLeaveHistory(currentPage);
  }, [isModal, currentPage, formdata.limit, formdata.order]);

  const OnchangeData = (e: any) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const fetchLeaveHistory = async (page: number) => {
    try {
      let userId = localStorage.getItem("UserId");
      let accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Token not found. Redirect to login page.");
        return;
      }

      const response = await fetch(
        `http://192.168.1.2:8080/api/employee/user/details?page=${page}&limit=${formdata.limit}&order=${formdata.order}`,
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
        const userLeaveRequests = userDetails[0].leaveRequests;
        const userLeaveBalance = userDetails[0].leaveBalance;
        // const { leaveRequests, totalPages, totalCount } = userDetails.data;
        setLeaveHistory(userLeaveRequests.data);
        setTotalPages(userLeaveRequests.totalPages);
        setTotalCount(userLeaveRequests.totalCount);
        setLeaveTypes(userLeaveBalance);
      } else if (response.status === 401) {
        // Token expired, try refreshing the token
        const refreshResponse = await fetch(
          "http://192.168.1.2:8080/api/refresh",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (refreshResponse.ok) {
          const { accessToken: newAccessToken } = await refreshResponse.json();
          localStorage.setItem("accessToken", newAccessToken);
          // Retry fetching user details with the new access token
          fetchLeaveHistory(currentPage);
        } else {
          console.error("Failed to refresh token. Redirect to login page.");
        }
      } else {
        console.error("Failed to fetch user details");
      }
    } catch (error: any) {
      console.error("Error fetching user details:", error.message);
    }
  };

  const openEditPopup = (user: any) => {
    setSelectedUser(user);
    setModal(true);
  };

  const handleEditUserUpdate = () => {
    setModal(false);
  };

  const handleDelete = async (deletedItemId: any) => {
    try {
      const response = await deleteUser(`leave-request/${deletedItemId}`);

      if (response.status === 200) {
        const updatedLeaveHistory = leaveHistory.filter(
          (item) => item.id !== deletedItemId
        );
        setLeaveHistory(updatedLeaveHistory);
        toast.success("LeaveApplication deleted successfully!");
        fetchLeaveHistory(currentPage);
      } else {
        console.error("Delete failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Failed to delete LeaveApplication!");
    } finally {
      setDeleteConfirmationVisible(false);
    }
  };

  function getColorForStatus(status: string) {
    switch (status) {
      case "Approved":
        return "text-green-500"; // Green for Present
      case "Rejected":
        return "text-red-500"; // Red for Reject
      case "Pending":
        return "text-yellow-500"; // Yellow for Pending
      default:
        return ""; // No color for unknown status
    }
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const deleteUserHandler = async (userId: number) => {
    setSelectedUserId(userId);
    setDeleteConfirmationVisible(true);
  };
  const cancelDeleteUser = () => {
    setDeleteConfirmationVisible(false);
  };
  return (
    <>
      <LeaveRequestComponent
        isModal={isModal}
        handleClose={() => setModal(false)}
        user={selectedUser}
        onUpdate={handleEditUserUpdate}
      />
      <RequestTemplate
        // deleteSelected={deleteUserHandler}
        openEditPopup={openEditPopup}
        setModal={setModal}
        leaveHistory={leaveHistory}
        onDelete={handleDelete}
        leaveType={""}
        startDate={""}
        endDate={""}
        reason={""}
        status={""}
        id={""}
        deleteSelected={deleteUserHandler}
        confirmDeleteUser={handleDelete}
        cancelDeleteUser={cancelDeleteUser}
        selectedUserId={selectedUserId}
        isDeleteConfirmationVisible={isDeleteConfirmationVisible}
        getColorForStatus={getColorForStatus}
        currentPage={currentPage}
        paginate={paginate}
        totalPages={totalPages}
        totalRecords={totalRecords}
        totalCount={totalCount}
        OnchangeData={OnchangeData}
        formdata={formdata}
        leaveTypes={leaveTypes}
        total_days={0}
        createdAt={undefined} />
    </>
  );
};

export default RequestComponent;
