"use client";
import React, { useEffect, useState } from "react";
import ReportsTemplate from "./reportsTemplate";
import { AttendanceHistory, UserDetails } from "@/services/api";
import { ReportEntry } from "./reportsInterface";

const Reports: React.FC = () => {
  const [attendance, setAttendance] = useState<ReportEntry[] | null>(null);
  const [filterType, setFilterType] = useState<"name" | "date">("name");
  const [filterValue, setFilterValue] = useState<string | [string, string]>("");
  const [allUsers, setAllUsers] = useState<any[]>([]);

  useEffect(() => {
    // Fetch all users from the server when the component mounts
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const url = "users";
      const response: any = await UserDetails(url);
      setAllUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    const fetchAttendanceHistory = async () => {
      try {
        const url = "attendance";
        const response: any = await AttendanceHistory(url);
        // Parse totalHours to number
        const dataWithParsedTotalHours = response.data.map((entry: any) => ({
          ...entry,
          totalHours: parseFloat(entry.totalHours),
        }));
        setAttendance(dataWithParsedTotalHours);
      } catch (error: any) {
        console.error("Error fetching user details:", error.message);
      }
    };

    fetchAttendanceHistory();
  }, []);

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

  const handleFilterChange = (
    type: "name" | "date",
    value: string | [string, string]
  ) => {
    setFilterType(type);
    setFilterValue(value);
  };

  return (
    <>
      <ReportsTemplate
        attendance={filteredAttendance}
        filterName={filterType === "name" ? (filterValue as string) : ""}
        setFilterName={(value: any) => setFilterValue(value)}
        handleFilterChange={handleFilterChange}
        allUsers={allUsers} 
        />
    </>
  );
};

export default Reports;
