"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios"; // Import Axios for making HTTP requests

import UserFormComponent from "../userForm/page";
import { UserDetails, deleteUser } from "@/services/api";
import UserTemplate from "./UserTemplate";

const initialFormValues = {
  name: "",
  email: "",
  department: "",
  userRole: "",
  isActive: true,
  limit: "10",
  order: "",
};

const UserComponent: React.FC = () => {
  const [formdata, setFormdata] = useState(initialFormValues);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isModal, setModal] = useState<boolean>(false);
  const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortColumn, setSortColumn] = useState<string>("name");
<<<<<<< HEAD:src/app/components/admin/table/page.tsx
=======
  const [currentTab, setCurrentTab] = useState("Active");
  const [filterType, setFilterType] = useState<"userRole">("userRole");
  const [filterValue, setFilterValue] = useState<string | [string, string]>("");
>>>>>>> da3330fc74a7096a34f84dabd6224a8180401625:src/app/components/admin/user/page.tsx

  useEffect(() => {
    // Fetch all users from the server when the component mounts
    getAllUsers(currentPage, currentTab === "Active");
  }, [
    filterValue,
    isModal,
    currentPage,
    formdata.limit,
    formdata.order,
    sortColumn,
    sortOrder,
    currentTab,
  ]);

  const OnchangeData = (e: any) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const getAllUsers = async (page: number, isActive: boolean) => {
    try {
      const url = `employee/users?page=${page}&limit=${formdata.limit}&order=${formdata.order}&sortColumn=${sortColumn}&sortOrder=${sortOrder}&userRole=${filterValue}&isActive=${isActive}`;
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
      getAllUsers(currentPage, currentTab === "Active");
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
    getAllUsers(currentPage, currentTab === "Active");
    setModal(false);
  };

  const handleToggleUserStatus = async (userId: string, isActive: boolean) => {
    try {
      await axios.put(
<<<<<<< HEAD:src/app/components/admin/table/page.tsx
        `
      http://192.168.1.12:8082/api/employee/users/${userId}/status`,
        { isActive }
      );
      getAllUsers(currentPage); // Refresh the user list after updating status
=======
        `http://192.168.1.2:8082/api/employee/users/${userId}/status`,
        { isActive }
      );
      getAllUsers(currentPage, currentTab === "Active"); // Refresh the user list after updating status
>>>>>>> da3330fc74a7096a34f84dabd6224a8180401625:src/app/components/admin/user/page.tsx
      toast.success(`User ${isActive ? "enabled" : "disabled"} successfully!`);
    } catch (error) {
      console.error("Error toggling user status:", error);
      toast.error("Failed to toggle user status!");
    }
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSort = (column: string) => {
    const order = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(order);
    setSortColumn(column);
  };

  const handleFilterChange = (
    type: "userRole",
    value: string | [string, string]
  ) => {
    setFilterType(type);
    setFilterValue(value);
  };

  return (
    <>
      <UserFormComponent
        isModal={isModal}
        handleClose={() => setModal(false)}
        user={selectedUser}
        onUpdate={handleEditUserUpdate}
      />
      <UserTemplate
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
        handleSort={handleSort}
        sortOrder={sortOrder}
        sortColumn={sortColumn}
<<<<<<< HEAD:src/app/components/admin/table/page.tsx
=======
        filterName={filterType === "userRole" ? (filterValue as string) : ""}
        setFilterName={(value: any) => setFilterValue(value)}
        handleFilterChange={handleFilterChange}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
>>>>>>> da3330fc74a7096a34f84dabd6224a8180401625:src/app/components/admin/user/page.tsx
      />
    </>
  );
};

export default UserComponent;
