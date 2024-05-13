"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios"; // Import Axios for making HTTP requests

import RequestTemplate from "./RequestTemplate";
import LeaveRequestComponent from "../leaverequest/page";
import { RequestInterface } from "./RequestInterface";

const initialFormValues = {
  name: "",
  email: "",
  department: "",
  userRole: "",
  isActive: true,
};

const RequestComponent: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isModal, setModal] = useState<boolean>(false);
  const [leaveHistory, setLeaveHistory] = useState<RequestInterface[]>([]);
  const [leaveOverview, setLeaveOverview] = useState<any>({});

  useEffect(() => {
    // Fetch all users from the server when the component mounts
    fetchLeaveHistory();

  }, [isModal]);

  useEffect(() => {
    // Fetch all users from the server when the component mounts

    fetchLeaveOverview()
  }, []);

  const fetchLeaveOverview = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/leaveOverview`); // Adjust the endpoint URL as per your backend setup
      console.log(response.data)
      setLeaveOverview(response.data);
    } catch (error) {
      console.error("Error fetching leave overview:", error);
    }
  };

  const fetchLeaveHistory = async () => {
    try {
      let userId = localStorage.getItem('UserId');
      let accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        console.error('Token not found. Redirect to login page.');
        return;
      }

      const response = await fetch(`http://localhost:8080/api/employee/user/details`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const userDetails = await response.json();
        const userLeaveRequests = userDetails[0].leaveRequests;
        setLeaveHistory(userLeaveRequests);
      } else if (response.status === 401) {
        // Token expired, try refreshing the token
        const refreshResponse = await fetch('http://localhost:8080/api/refresh', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (refreshResponse.ok) {
          const { accessToken: newAccessToken } = await refreshResponse.json();
          localStorage.setItem('accessToken', newAccessToken);
          // Retry fetching user details with the new access token
          fetchLeaveHistory();
        } else {
          console.error('Failed to refresh token. Redirect to login page.');
        }
      } else {
        console.error('Failed to fetch user details');
      }
    } catch (error: any) {
      console.error('Error fetching user details:', error.message);
    }
  };



  // const deleteUserHandler = async (userId: string) => {
  //   setSelectedUserId(userId);
  //   setDeleteConfirmationVisible(true);
  // };



  const openEditPopup = (user: any) => {
    setSelectedUser(user);
    setModal(true);
  };

  const handleEditUserUpdate = () => {
    setModal(false);
  };

  const handleFormSubmit = async (editedItem: any) => {
    try {
      const response = await fetch(`http://localhost:8080/api/leave-request/${editedItem.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedItem),
      });
      if (response.ok) {
        const updatedLeaveHistory: any = leaveHistory.map(item => {
          if (item.id === editedItem.id) {
            return editedItem;
          }
          return item;
        });
        setLeaveHistory(updatedLeaveHistory);
        setModal(false);
        console.log('Edit successful');
      } else {
        console.error('Edit failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error editing item:', error);
    }
  };

  const handleDelete = async (deletedItemId: any) => {
    try {
      const response = await fetch(`http://localhost:8080/api/leave-request/${deletedItemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      if (response.ok) {
        const updatedLeaveHistory = leaveHistory.filter(item => item.id !== deletedItemId);
        setLeaveHistory(updatedLeaveHistory);
        console.log('Delete successful');
      } else {
        console.error('Delete failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
  //   const handleEditItemUpdate = (updatedItem: LeaveHistoryInterface) => {
  //     // Update the item in leaveHistory array
  //     const updatedLeaveHistory = leaveHistory.map(item =>
  //         item.id === updatedItem.id ? updatedItem : item
  //     );
  //     setLeaveHistory(updatedLeaveHistory);
  //     setModal(false);
  // };
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
        leaveType={''}
        startDate={''}
        endDate={''}
        reason={''}
        status={''}
        id={''}
        leaveOverview={leaveOverview}
      />
    </>
  );
};

export default RequestComponent;
