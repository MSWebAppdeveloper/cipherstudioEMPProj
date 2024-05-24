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
  limit: "12",
  order: ""
};

const UserTableComponent: React.FC = () => {
  const [formdata, setFormdata] = useState(initialFormValues);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isModal, setModal] = useState<boolean>(false);
  const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [filterValue, setFilterValue] = useState<string | [string, string]>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalCount, setTotalCount] = useState(0);


  useEffect(() => {
    // Fetch all users from the server when the component mounts
    getAllUsers(currentPage);
  }, [isModal, formdata.limit, formdata.order]);

  const OnchangeData = (e: any) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value
    });
  };

  const getAllUsers = async (page: number) => {
    try {
      const url = `employee/users?page=${page}&limit=${formdata.limit}&order=${formdata.order}`;
      const response: any = await UserDetails(url);
      setAllUsers(response.data.data);
      setTotalPages(response.data.totalPages);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    // When the filter value changes, reset the current page to 1
    setCurrentPage(1);
  }, [filterValue, formdata.limit, formdata.order]);


  const deleteUserHandler = async (userId: string) => {
    setSelectedUserId(userId);
    setDeleteConfirmationVisible(true);
  };

  const confirmDeleteUser = async () => {
    try {
      await deleteUser(`employee/users/${selectedUserId}`);
      getAllUsers(currentPage);
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
    getAllUsers(currentPage);
    setModal(false);
  };

  const handleToggleUserStatus = async (userId: string, isActive: boolean) => {
    try {
      await axios.put(`
      http://192.168.1.2:8080/api/employee/users/${userId}/status`, { isActive });
      getAllUsers(currentPage); // Refresh the user list after updating status
      toast.success(`User ${isActive ? 'enabled' : 'disabled'} successfully!`);
    } catch (error) {
      console.error("Error toggling user status:", error);
      toast.error("Failed to toggle user status!");
    }
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


  return (
    <>
      <UserFormComponent
        isModal={isModal}
        handleClose={() => setModal(false)}
        user={selectedUser}
        onUpdate={handleEditUserUpdate}

      />
      <UserTableTemplate
        formdata={formdata}
        allUsers={allUsers}
        deleteSelected={deleteUserHandler}
        openEditPopup={openEditPopup}
        setModal={setModal}
        confirmDeleteUser={confirmDeleteUser}
        cancelDeleteUser={cancelDeleteUser}
        isDeleteConfirmationVisible={isDeleteConfirmationVisible}
        handleToggleUserStatus={handleToggleUserStatus}
        currentPage={currentPage}
        paginate={paginate}
        totalPages={totalPages}
        totalRecords={totalRecords}
        totalCount={totalCount}
        OnchangeData={OnchangeData}

      />
    </>
  );
};

export default UserTableComponent;
