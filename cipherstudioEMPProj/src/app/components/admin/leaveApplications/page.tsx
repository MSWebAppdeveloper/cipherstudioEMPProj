"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  ApproveLeave,
  HistoryLeave,
  RejectLeave,
  UserDetails,
} from "@/services/api";
import {
  LeaveApplicationDownloadData,
  LeaveApplicationsInterface,
} from "./leaveApplicationsInterface";
import LeaveApplicationsTemplate from "./leaveApplicationsTemplate";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const LeaveApplications: React.FC = () => {
  const [approverId, setApproverId] = useState<number | null>(null);
  const [leaveHistory, setLeaveHistory] = useState<
    LeaveApplicationsInterface[]
  >([]);
  const [downloadData, setDownloadData] = useState<
    LeaveApplicationDownloadData[]
  >([]);
  const [filterType, setFilterType] = useState<"status" | "name">("status");
  const [filterValue, setFilterValue] = useState<[string, string]>(["", ""]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [formdata, setFormdata] = useState({
    limit: "10",
    order: "",
    status: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [sortColumn, setSortColumn] = useState<string>("createdAt");
  const [allUsers, setAllUsers] = useState<any[]>([]);

  const [isDataFetched, setIsDataFetched] = useState(false);

  const router = useRouter();

  const OnchangeData = (e: any) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    getAllUsers(currentPage);
    fetchApproverId();
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

  const fetchLeaveHistory = async (page: number, forDownload = false) => {
    try {
      const statusFilter = filterValue[0] ? `&status=${filterValue[0]}` : "";
      const nameFilter = filterValue[1] ? `&name=${filterValue[1]}` : "";
      const limit = forDownload ? "" : `&limit=${formdata.limit}`;

      const url = `leave-requests?page=${page}&order=${formdata.order}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`;

      const downloadFlag = forDownload ? "&forDownload=true" : "";

      const response: any = await HistoryLeave(
        url + limit + downloadFlag + nameFilter + statusFilter
      );
      if (forDownload) {
        setDownloadData(response.data ?? []);
        setIsLoading(false);
      } else {
        setLeaveHistory(response.data.data ?? []);
        setTotalPages(response.data.totalPages ?? 0);
        setTotalCount(response.data.totalCount ?? 0);
      }
      // Update non-download state as usual
    } catch (error) {
      console.error("Error fetching leave history:", error);
    }
  };

  useEffect(() => {
    fetchLeaveHistory(currentPage);
  }, [
    filterValue,
    currentPage,
    formdata.limit,
    formdata.order,
    sortColumn,
    sortOrder,
  ]);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await fetch(
      "http://192.168.1.8:8080/api/employee/refresh",
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

  const ApproverId = async () => {
    try {
      let accessToken = localStorage.getItem("accessToken");
      let response = await fetch(
        "http://192.168.1.8:8080/api/employee/user/details",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 401) {
        try {
          accessToken = await refreshToken();
          response = await fetch(
            "http://192.168.1.8:8080/api/employee/user/details",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
        } catch (error) {
          console.error("Failed to refresh token. Redirect to login page.");
          await signOut({
            callbackUrl: "/login",
            redirect: false,
          });
          localStorage.clear();
          toast.success("Login Again");
          router.push("/login");
        }
      }

      const user = await response.json();
      if (user.length > 0) {
        return user[0].id; // Replace 'UserId' with the actual property name
      } else {
        throw new Error("No user found");
      }
    } catch (error) {
      console.error("Error fetching user ID:", error);
      throw error;
    }
  };

  const fetchApproverId = async () => {
    try {
      const loggedInApproverId = await ApproverId();
      setApproverId(loggedInApproverId);
    } catch (error) {
      console.error("Error fetching user ID:", error);
    }
  };

  const approveApplication = async (id: any) => {
    try {
      await fetchApproverId();
      const url = `approval`; // Update the URL based on your backend API
      await ApproveLeave(url, {
        leave_request_id: id,
        response: "Approved",
        approver_id: approverId,
      });

      setLeaveHistory(
        leaveHistory.map((leave) => {
          if (leave.id === id) {
            return { ...leave, status: "Approved" };
          }
          return leave;
        })
      );
    } catch (error) {
      console.error("Error approving leave application:", error);
    }
  };

  const rejectApplication = async (id: any) => {
    try {
      await fetchApproverId();
      const url = `approval`; // Update the URL based on your backend API
      await RejectLeave(url, {
        leave_request_id: id,
        response: "Rejected",
        approver_id: approverId,
      });

      setLeaveHistory(
        leaveHistory.map((leave) => {
          if (leave.id === id) {
            return { ...leave, status: "Rejected" };
          }
          return leave;
        })
      );
    } catch (error) {
      console.error("Error rejecting leave application:", error);
    }
  };

  const handleFilterChange = (type: "status" | "name", value: string) => {
    setFilterValue((prevValue) => {
      return type === "status" ? [value, prevValue[1]] : [prevValue[0], value];
    });
  };

  const handleSort = (column: string) => {
    const order = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(order);
    setSortColumn(column);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const fetchAllRecords = async () => {
    setIsLoading(true);
    await fetchLeaveHistory(1, true);
  };

  return (
    <>
      <LeaveApplicationsTemplate
        leaveHistory={leaveHistory}
        leaveType={""}
        startDate={""}
        endDate={""}
        reason={""}
        status={""}
        userName={""}
        id={""}
        approveApplication={approveApplication}
        rejectApplication={rejectApplication}
        filterStatus={filterValue[0]}
        filterName={filterValue[1]}
        setFilterName={(value: any) => setFilterValue(value)}
        allUsers={allUsers}
        currentPage={currentPage}
        paginate={paginate}
        totalPages={totalPages}
        totalRecords={totalRecords}
        totalCount={totalCount}
        OnchangeData={OnchangeData}
        formdata={formdata}
        handleFilterChange={handleFilterChange}
        total_days={0}
        handleSort={handleSort}
        sortOrder={sortOrder}
        sortColumn={sortColumn}
        downloadData={downloadData}
        isLoading={isLoading}
        fetchAllRecords={fetchAllRecords}
        isDataFetched={isDataFetched}
        setIsDataFetched={setIsDataFetched}
      />
    </>
  );
};

export default LeaveApplications;
