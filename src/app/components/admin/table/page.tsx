"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios"; // Import Axios for making HTTP requests

import UserTableTemplate from "./TableTemplate";
import UserFormComponent from "../form/page";
import { UserDetails, deleteUser } from "@/services/api";

const initialFormValues = {
  name: "",
  email: "",
  department: "",
  userRole: "",
  isActive: true,
};

const UserTableComponent: React.FC = () => {
  const [formdata] = useState(initialFormValues);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isModal, setModal] = useState<boolean>(false);
  const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<string>("");

  useEffect(() => {
    // Fetch all users from the server when the component mounts
    getAllUsers();
  }, [isModal]);

  const getAllUsers = async () => {
    try {
      const url = "employee/users";
      const response: any = await UserDetails(url);
      setAllUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUserHandler = async (userId: string) => {
    setSelectedUserId(userId);
    setDeleteConfirmationVisible(true);
  };

  const confirmDeleteUser = async () => {
    try {
      await deleteUser(`employee/users/${selectedUserId}`);
      getAllUsers();
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user!");
    } finally {
      setDeleteConfirmationVisible(false);
    }
  };

  const cancelDeleteUser = () => {
    setDeleteConfirmationVisible(false);
  };


  const openEditPopup = (user: any) => {
    setSelectedUser(user);
    setModal(true);
  };

  const handleEditUserUpdate = () => {
    getAllUsers();
    setModal(false);
  };

  const handleToggleUserStatus = async (userId: string, isActive: boolean) => {
    try {
      await axios.put(`
      http://192.168.1.25:8082/api/employee/users/${userId}/status`, { isActive });
      getAllUsers(); // Refresh the user list after updating status
      toast.success(`User ${isActive ? 'enabled' : 'disabled'} successfully!`);
    } catch (error) {
      console.error("Error toggling user status:", error);
      toast.error("Failed to toggle user status!");
    }
  };

  return (
    <>
      <UserFormComponent
        isModal={isModal}
        handleClose={() => setModal(false)}
        user={selectedUser}
        onUpdate={handleEditUserUpdate}

      />
      <UserTableTemplate
        formValues={formdata}
        allUsers={allUsers}
        deleteSelected={deleteUserHandler}
        openEditPopup={openEditPopup}
        setModal={setModal}
        confirmDeleteUser={confirmDeleteUser}
        cancelDeleteUser={cancelDeleteUser}
        isDeleteConfirmationVisible={isDeleteConfirmationVisible}
         handleToggleUserStatus={handleToggleUserStatus}        
      />
    </>
  );
};

export default UserTableComponent;
