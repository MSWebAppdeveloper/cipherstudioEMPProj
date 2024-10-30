"use client";
import React, { useEffect, useState } from "react";
import ReportsTemplate from "./reportsTemplate";
import { AttendanceHistory, UserDetails } from "@/services/api";
import { ReportEntry } from "./reportsInterface";

const Reports: React.FC = () => {
  const [attendance, setAttendance] = useState<ReportEntry[]>([]);
  const [reports, setReports] = useState<ReportEntry[]>([]);
  const [filterType, setFilterType] = useState<"name" | "date">("name");
  const [filterValue, setFilterValue] = useState<string | [string, string]>("");

  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [formdata, setFormdata] = useState({
    limit: "10",
    order: "",
    status: "",
  });
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [downloadData, setDownloadData] = useState<ReportEntry[]>([]);

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [sortColumn, setSortColumn] = useState<string>("date");
  const [isLoading, setIsLoading] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);

  const OnchangeData = (e: any) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };
//ab dono component h tumhare pas to ab mujhe jese page vale component me sortable ke liyea bollean value le h vese hi column ke liyea visible lo or fir use table component me mange kro
  useEffect(() => {
    getAllUsers(currentPage);
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

  const fetchAttendanceHistory = async (page: number, forDownload = false) => {
    try {
      const baseUrl = `employee/attendance?page=${page}&order=${formdata.order}`;
      const limit = forDownload ? "" : `&limit=${formdata.limit}`;
      const nameFilter = filterValue ? `&name=${filterValue}` : "";
      const dateFilter =
        startDate && endDate
          ? `&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
          : "";
      const sort = sortColumn
        ? `&sortColumn=${sortColumn}&sortOrder=${sortOrder}`
        : "";
      const downloadFlag = forDownload ? "&forDownload=true" : "";

      const response: any = await AttendanceHistory(
        baseUrl + limit + nameFilter + dateFilter + sort + downloadFlag
      );

      if (forDownload) {
        setDownloadData(response.data);
        setIsLoading(false);
      } else {
        const dataWithParsedTotalHours = response.data.data.map(
          (entry: any) => ({
            ...entry,
            totalHours: parseFloat(entry.totalHours),
          })
        );
        setAttendance(dataWithParsedTotalHours);
        setTotalPages(response.data.totalPages);
        setTotalCount(response.data.totalCount);
      }
    } catch (error: any) {
      console.error("Error fetching attendance history:", error.message);
    }
  };

  useEffect(() => {
    fetchAttendanceHistory(currentPage);
  }, [
    currentPage,
    filterValue,
    formdata.limit,
    formdata.order,
    startDate,
    endDate,
    sortColumn,
    sortOrder,
  ]);

  const handleFilterChange = (
    type: "name" | "date",
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

  const fetchAllRecords = async () => {
    setIsLoading(true);
    await fetchAttendanceHistory(1, true);
  };

  return (
    <>
      <ReportsTemplate
        attendance={attendance}
        reports={reports}
        filterName={filterType === "name" ? (filterValue as string) : ""}
        setFilterName={(value: any) => setFilterValue(value)}
        handleFilterChange={handleFilterChange}
        downloadData={downloadData}
        fetchAllRecords={fetchAllRecords}
        allUsers={allUsers}
        currentPage={currentPage}
        paginate={paginate}
        totalPages={totalPages}
        totalRecords={totalRecords}
        totalCount={totalCount}
        OnchangeData={OnchangeData}
        formdata={formdata}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        handleSort={handleSort}
        sortOrder={sortOrder}
        sortColumn={sortColumn}
        isLoading={isLoading}
        isDataFetched={isDataFetched}
        setIsDataFetched={setIsDataFetched}
      />
    </>
  );
};

export default Reports;
