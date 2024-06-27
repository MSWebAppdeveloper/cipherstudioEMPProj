"use client";
import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import toast from "react-hot-toast";
import { LeaveTypes, RequestLeave } from "@/services/api";
import LeaveRequestTemplate from "./LeaveRequestTemplate";

const initialValues = {
  leaveType: "",
  startDate: "",
  endDate: "",
  reason: "",
};
interface LeaveRequestComponentProps {
  isModal: boolean;
  handleClose: () => void;
  user: any;
  onUpdate: () => void;
}
const LeaveRequestComponent: React.FC<LeaveRequestComponentProps> = ({
  isModal,
  handleClose,
  user,
  onUpdate,
}) => {
  const [formdata, setFormdata] = useState(initialValues);
  const [leaveTypes, setLeaveTypes] = useState<
    { leave_type_id: number; leave_type_name: string }[]
  >([]);
  const [UserId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchLeaveTypes = async () => {
      try {
        const url = `leavetypes`;
        const response: any = await LeaveTypes(url);
        // console.log(response.data);
        setLeaveTypes(response.data.data);
      } catch (error) {
        console.error("Error fetching leaveTypes:", error);
      }
    };

    fetchLeaveTypes();
    const fetchUserId = async () => {
      try {
        // Replace this with your actual authentication logic
        // const loggedInUserId = await fetchLoggedInUserId();
        const UserId: any = localStorage.getItem("UserId");
        setUserId(UserId);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);
  const fetchLoggedInUserId = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(
        "http://192.168.1.12:8082/api/users/user/details",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const user = await response.json();
      if (user.length > 0) {
        return user[0].UserId; // Replace 'UserId' with the actual property name
      } else {
        // Handle the case where no user is found
        throw new Error("No user found");
      }
    } catch (error) {
      console.error("Error fetching user ID:", error);
      throw error;
    }
  };

  const dataChange = (e: any) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const requestData = {
        ...formdata,
        UserId: UserId,
        userName: localStorage.getItem("name"),
      };
      const url = `leave-request`;
      const response: any = await RequestLeave(url, requestData);
      if (response.status === 201) {
        toast.success("Leave request submitted successfully");
        setFormdata(initialValues);
        handleClose();
      } else {
        toast.error(response.data);
      }
    } catch (error: any) {
      console.error(
        "Error submitting leave request:",
        error.response.data.error
      );
      toast.error(error.response.data.error);
    }
  };

  const handleClosePopup = () => {
    setFormdata(initialValues); // Clear formData before closing
    handleClose();
  };
  return (
    <LeaveRequestTemplate
      dataChange={dataChange}
      handleOnSubmit={handleOnSubmit}
      formdata={formdata}
      leaveTypes={leaveTypes}
      isModal={isModal}
      handleClose={handleClosePopup}
      loading={loading}
    />
=======
import axios from "axios"; // Import Axios for making HTTP requests

import LeaveRequestTemplate from "./LeaveRequestTemplate";
import LeaveRequestFormComponent from "../leaveRequestForm/page";
import { LeaveRequestInterface } from "./LeaveRequestInterface";
import { LeaveTypes, deleteUser } from "@/services/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const LeaveRequestComponent: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isModal, setModal] = useState<boolean>(false);
  const [leaveHistory, setLeaveHistory] = useState<LeaveRequestInterface[]>([]);
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
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<number>();
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [sortColumn, setSortColumn] = useState<string>("createdAt");
  const router = useRouter();

  useEffect(() => {
    // Fetch all users from the server when the component mounts

    fetchLeaveHistory(currentPage);
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
      "http://192.168.1.2:8080/api/employee/refresh",
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

  const fetchLeaveHistory = async (page: number) => {
    try {
      let userId = localStorage.getItem("UserId");
      // const statusFilter = filterValue ? `&status=${filterValue}` : "";
      let accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Token not found. Redirect to login page.");
        return;
      }

      const response = await fetch(
        `http://192.168.1.2:8080/api/employee/user/details?page=${page}&limit=${formdata.limit}&order=${formdata.order}&year=${formdata.year}&sortColumn=${sortColumn}&sortOrder=${sortOrder}&status=${filterValue}`,
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
        // console.log(userDetails)
        const userLeaveRequests = userDetails[0].leaveRequests;
        const userLeaveBalance = userDetails[0].leaveBalance;
        // const { leaveRequests, totalPages, totalCount } = userDetails.data;
        setLeaveHistory(userLeaveRequests.data);
        setTotalPages(userLeaveRequests.totalPages);
        setTotalCount(userLeaveRequests.totalCount);
        setLeaveTypes(userLeaveBalance);
      } else if (response.status === 401) {
        try {
          const newAccessToken = await refreshToken();
          if (newAccessToken) {
            fetchLeaveHistory(page); // Retry fetching with the new token
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

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const deleteUserHandler = async (userId: number) => {
    setSelectedUserId(userId);
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
      <LeaveRequestFormComponent
        isModal={isModal}
        handleClose={() => setModal(false)}
        user={selectedUser}
        onUpdate={handleEditUserUpdate}
      />
      <LeaveRequestTemplate
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
        filterName={filterType === "status" ? (filterValue as string) : ""}
        setFilterName={(value: any) => setFilterValue(value)}
        handleFilterChange={handleFilterChange}
        deleteSelected={deleteUserHandler}
        confirmDeleteUser={handleDelete}
        cancelDeleteUser={cancelDeleteUser}
        selectedUserId={selectedUserId}
        isDeleteConfirmationVisible={isDeleteConfirmationVisible}
        currentPage={currentPage}
        paginate={paginate}
        totalPages={totalPages}
        totalRecords={totalRecords}
        totalCount={totalCount}
        OnchangeData={OnchangeData}
        formdata={formdata}
        leaveTypes={leaveTypes}
        total_days={0}
        createdAt={undefined}
        selectedYear={selectedYear}
        handleSort={handleSort}
        sortOrder={sortOrder}
        sortColumn={sortColumn}
      />
    </>
>>>>>>> da3330fc74a7096a34f84dabd6224a8180401625
  );
};

export default LeaveRequestComponent;
