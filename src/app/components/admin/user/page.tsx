"use client";
import React, { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios"; // Import Axios for making HTTP requests

import UserFormComponent from "../userForm/page";
import { UserDetails, deleteUser } from "@/services/api";
import UserTemplate from "./UserTemplate";
import CalendarWithAttendance from "@/components/CalendearWithAttendence";
import { AttendanceHistory } from "@/services/api";
const initialFormValues = {
  name: "",
  email: "",
  department: "",
  userRole: "",
  isActive: true,
  limit: "10",
  order: "",
  shift: "",
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
  const [currentTab, setCurrentTab] = useState("Active");
  const [filterType, setFilterType] = useState<"userRole">("userRole");
  const [filterValue, setFilterValue] = useState<string | [string, string]>("");
  const [shift, setShift] = useState("");
  const [selectedUserAttendance, setSelectedUserAttendance] = useState<any[]>([])
  const [showCalendarModal, setShowCalendarModal] = useState<boolean>(false)
  const [attendanceData, setAttendanceData] = useState<any[]>([]);

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
      const url = `employee/allusers?page=${page}&limit=${formdata.limit}&order=${formdata.order}&sortColumn=${sortColumn}&sortOrder=${sortOrder}&userRole=${filterValue}&isActive=${isActive}`;
      const response: any = await UserDetails(url);
      setAllUsers(response.data.data);
      setTotalPages(response.data.totalPages);
      setTotalCount(response.data.totalCount);
      setShift(response.data.shift);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    // When the filter value changes, reset the current page to 1
    setCurrentPage(1);
  }, [filterValue, formdata.limit, formdata.order]);

  const deleteUserHandler = async (userId: string) => {
    // console.log("Deleting user",userId);
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
        `http://192.168.1.8:8080/api/employee/users/${userId}/status`,
        { isActive }
      );
      getAllUsers(currentPage, currentTab === "Active"); // Refresh the user list after updating status
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


  const fetchAttendanceHistory = async (userId: string) => {
    try {
      const response = await axios.get(
        `http://192.168.1.8:8080/api/employee/users/${userId}`
      );
      if (response.data && response.data[0].attendance) {
        const formattedAttendance = response.data[0].attendance.map((attend: any) => ({
          title: attend.status,
          status: attend.status,
          date: attend.date,
          start: attend.timeIn,
          end: attend.timeOut,
        }));
        
        return formattedAttendance;
        
      }
    } catch (error:any) {
      console.error("Error fetching attendance history:", error.message);
      return [];
    }
  };
  
  const handleCalendarClick = async (userId: string) => {
    const userAttendance = await fetchAttendanceHistory(userId);
    setSelectedUserAttendance(userAttendance || []);
    setShowCalendarModal(true);
  };
  
  return (
    <>
      <UserFormComponent
        isModal={isModal}
        handleClose={() => setModal(false)}
        user={selectedUser}
        onUpdate={handleEditUserUpdate}
        shift={shift}
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
        filterName={filterType === "userRole" ? (filterValue as string) : ""}
        setFilterName={(value: any) => setFilterValue(value)}
        handleFilterChange={handleFilterChange}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        handleCalendarClick={handleCalendarClick}
      />
      {showCalendarModal && (
        <div className="  absolute inset-0 flex justify-center items-center bg-gray-900 bg-opacity-75  z-[999]">
          <div className=" bg-white p-4 rounded shadow-md max-w-4xl w-3/4 h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-2">Attendance Calendar</h2>
            <CalendarWithAttendance attendanceData={selectedUserAttendance} />
            <button
              onClick={() => setShowCalendarModal(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UserComponent;
