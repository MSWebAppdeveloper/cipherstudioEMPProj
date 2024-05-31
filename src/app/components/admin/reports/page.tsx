"use client";
import React, { useEffect, useState } from "react";
import ReportsTemplate from "./reportsTemplate";
import { AttendanceHistory, UserDetails } from "@/services/api";
import { ReportEntry } from "./reportsInterface";

const Reports: React.FC = () => {
  const [attendance, setAttendance] = useState<ReportEntry[]>([]);
  const [filterType, setFilterType] = useState<"name" | "date">("name");
  const [filterValue, setFilterValue] = useState<string | [string, string]>("");
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [formdata, setFormdata] = useState(
    {
      limit: "12",
      order: ""
    }
  )
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  
  const OnchangeData = (e: any) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    // Fetch all users from the server when the component mounts
    getAllUsers(currentPage);
    +(currentPage);
  }, []);

  const getAllUsers = async (page: number) => {
    try {
      const url = `employee/users?page=${page}&limit=${formdata.limit}&order=${formdata.order}`;
      const response: any = await UserDetails(url);
      setAllUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    // When the filter value changes, reset the current page to 1
    setCurrentPage(1);
  }, [filterValue, formdata.limit, formdata.order]);

  useEffect(() => {
    const fetchAttendanceHistory = async (page: number) => {
      try {
        const url = `employee/attendance?page=${page}&limit=${formdata.limit}&order=${formdata.order}`;

        // Add name filter if filterType is 'name'
        const nameFilter = filterType === "name" ? `&name=${filterValue}` : "";
        const dateFilter = startDate && endDate ? `&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}` : "";
        const response: any = await AttendanceHistory(url + nameFilter + dateFilter);

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
  }, [currentPage, filterValue, filterType, formdata.limit, formdata.order,startDate, endDate]);


  const handleFilterChange = (
    type: "name" | "date",
    value: string | [string, string]
  ) => {
    setFilterType(type);
    setFilterValue(value);
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
        OnchangeData={OnchangeData}
        formdata={formdata} 
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        />
    </>
  );
};

export default Reports;
