"use client";
import React, { useEffect, useState } from "react";
import { ApproveLeave, HistoryLeave, RejectLeave } from "@/services/api";
import { LeaveApplicationsInterface } from "./leaveApplicationsInterface";
import LeaveApplicationsTemplate from "./leaveApplicationsTemplate";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const LeaveApplications: React.FC = () => {
  const [approverId, setApproverId] = useState<number | null>(null);
  const [leaveHistory, setLeaveHistory] = useState<
    LeaveApplicationsInterface[]
  >([]);
  const [filterType, setFilterType] = useState<"status">("status");
  const [filterValue, setFilterValue] = useState<string | [string, string]>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [formdata, setFormdata] = useState({
    limit: "10",
    order: "",
    status: "",
  });
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [sortColumn, setSortColumn] = useState<string>("createdAt");
  const router = useRouter();

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

  const ApproverId = async () => {
    try {
      let accessToken = localStorage.getItem("accessToken");
      let response = await fetch(
        "http://192.168.1.2:8080/api/employee/user/details",
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
            "http://192.168.1.2:8080/api/employee/user/details",
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

  const fetchLeaveHistory = async (page: number) => {
    try {
      const url = `leave-requests?page=${page}&limit=${formdata.limit}&order=${formdata.order}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`;
      const response: any = await HistoryLeave(url);
      setLeaveHistory(response.data.data);
      setTotalPages(response.data.totalPages);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error("Error fetching leave history:", error);
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

  useEffect(() => {
    const fetchData = async () => {
      await fetchApproverId();
      await fetchLeaveHistory(currentPage);
    };

    fetchData();
  }, [currentPage, formdata.limit, formdata.order, sortColumn, sortOrder]);

  const handleFilterChange = (
    type: "status",
    value: string | [string, string]
  ) => {
    setFilterType(type);
    setFilterValue(value);
  };

  const handleSort = (column: string) => {
    const order = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(order);
    setSortColumn(column);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
        filterName={filterType === "status" ? (filterValue as string) : ""}
        setFilterName={(value: any) => setFilterValue(value)}
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
      />
    </>
  );
};

export default LeaveApplications;
