"use client";
import React, { useEffect, useState } from "react";
import ReportsTemplate from "./reportsTemplate";
import { AttendanceHistory, UserDetails } from "@/services/api";
import { ReportEntry } from "./reportsInterface";

const Reports: React.FC = () => {
  const [attendance, setAttendance] = useState<ReportEntry[] >([]);
  const [filterType, setFilterType] = useState<"name" | "date">("name");
  const [filterValue, setFilterValue] = useState<string | [string, string]>("");
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalCount, setTotalCount] = useState(5);
  const [formdata, setFormdata] = useState(
    {
      limit: "12",
      order: ""
    }
  )
  const OnchangeData = (e: any) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value
    })
  }
  useEffect(() => {
    // Fetch all users from the server when the component mounts
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const url = "employee/users";
      const response: any = await UserDetails(url);
      setAllUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    // When the filter value changes, reset the current page to 1
    setCurrentPage(1);
  }, [formdata.limit, formdata.order]);

  useEffect(() => {
    const fetchAttendanceHistory = async (page: number) => {
      try {
        const url = `employee/attendance?page=${page}&limit=${formdata.limit}&order=${formdata.order}`;
        const response: any = await AttendanceHistory(url);
        // Parse totalHours to number
        const dataWithParsedTotalHours = response.data.data.map((entry: any) => ({
          ...entry,
          totalHours: parseFloat(entry.totalHours),
        }));
        setAttendance(dataWithParsedTotalHours);
        // setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
        setTotalCount(response.data.totalCount);
        // setTotalRecords(response.data.totalRecords);
      } catch (error: any) {
        console.error("Error fetching user details:", error.message);
      }
    };

    fetchAttendanceHistory(currentPage);
  }, [currentPage, formdata.limit, formdata.order]);


  // Filter data by name or date
  const filteredAttendance = attendance?.filter(user => {
    if (filterType === "name") {
      const filterValueAsString = typeof filterValue === "string" ? filterValue : filterValue[0];
      return user.userName.toLowerCase().includes(filterValueAsString.toLowerCase());
    } else if (filterType === "date") {
      const [startDate, endDate] = filterValue as [string, string];
      const entryDate = new Date(user.date);
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);
      return entryDate >= startDateObj && entryDate <= endDateObj;
    }
    return true;
  }) || [];

  // Sort filteredAttendance in descending order based on the date
  filteredAttendance.sort((a, b) => {
    const dateA: any = new Date(a.date);
    const dateB: any = new Date(b.date);
    return dateB - dateA; // Sort in descending order
  });

  const handleFilterChange = (
    type: "name" | "date",
    value: string | [string, string]
  ) => {
    setFilterType(type);
    setFilterValue(value);
  };

  const handleOrderChange = (e: any) => {
    setFormdata({
      ...formdata,
      order: e.target.value,
    });
  };


  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  function getColorForStatus(status: string) {
    switch (status) {
      case "Active":
        return "text-green-500";
      case "Absent":
        return "text-red-500"; // Red for Absent
      case "Leave":
        return "text-orange-500"; // Orange for Leave
      case "Leave (Half Day)":
        return "text-lightcoral"; // Lighter orange for Half Day Leave
      case "Short Leave":
        return "text-violet-500"; // Violet for Short Leave
      case "Full Day":
        return "text-yellow-500"; // yellow for Present
      case "Present(forget dayout)":
        return "text-yellow-300"; // Lighter green for Present (Extra Hours)
      default:
        return ""; // No color for unknown status
    }
  }

  return (
    <>
      <ReportsTemplate
        attendance={attendance}
        filterName={filterType === "name" ? (filterValue as string) : ""}
        setFilterName={(value: any) => setFilterValue(value)}
        handleFilterChange={handleFilterChange}
        allUsers={allUsers}
        currentPage={currentPage}
        paginate={paginate}
        totalPages={totalPages}
        getColorForStatus={getColorForStatus}
        totalRecords={totalRecords}
        totalCount={totalCount}
        handleOrderChange={handleOrderChange}
        OnchangeData={OnchangeData}
        formdata={formdata} />
    </>
  );
};

export default Reports;
