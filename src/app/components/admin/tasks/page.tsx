"use client";
import React, { useEffect, useState, useRef } from "react";
import { HistoryTask, UserDetails } from "@/services/api";

import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import TaskTemplate from "./tasksTemplate";
import { TaskInterface } from "./tasksInterface";

const TaskComponent: React.FC = () => {
  const [taskHistory, setTaskHistory] = useState<TaskInterface[]>([]);
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

  const fetchTaskHistory = async (page: number, forDownload = false) => {
    try {
      const statusFilter = filterValue[0] ? `&status=${filterValue[0]}` : "";
      const nameFilter = filterValue[1] ? `&name=${filterValue[1]}` : "";
      const limit = forDownload ? "" : `&limit=${formdata.limit}`;

      const url = `tasks?page=${page}&order=${formdata.order}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`;

      const response: any = await HistoryTask(
        url + limit + nameFilter + statusFilter
      );

      console.log(response.data.data);
      setTaskHistory(response.data.data ?? []);
      setTotalPages(response.data.totalPages ?? 0);
      setTotalCount(response.data.totalCount ?? 0);
    } catch (error) {
      console.error("Error fetching task history:", error);
    }
  };

  useEffect(() => {
    fetchTaskHistory(currentPage);
  }, [
    filterValue,
    currentPage,
    formdata.limit,
    formdata.order,
    sortColumn,
    sortOrder,
  ]);


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
    await fetchTaskHistory(1, true);
  };

  return (
    <>
      <TaskTemplate
        taskHistory={taskHistory}
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
        handleSort={handleSort}
        sortOrder={sortOrder}
        sortColumn={sortColumn}
        isLoading={isLoading}
        fetchAllRecords={fetchAllRecords}
        isDataFetched={isDataFetched}
        setIsDataFetched={setIsDataFetched}
      />
    </>
  );
};

export default TaskComponent;
