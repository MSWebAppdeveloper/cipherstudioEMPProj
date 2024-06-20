"use client";
import React, { useEffect, useState } from "react";
import OptionsTemplate from "./optionsTemplate";
import { LeaveTypes, deleteLeave } from "@/services/api";
import LeaveFormComponent from "../leaveForm/page";
import toast from "react-hot-toast";

const OptionsComponent: React.FC = () => {
  const [isModal, setModal] = useState<boolean>(false);
  const [allTypes, setAllTypes] = useState<any[]>([]);
  const [selectedLeave, setSelectedLeave] = useState<any>(null);
  const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState<boolean>(false);
  const [selectedLeaveId, setSelectedLeaveId] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const [leaveTypes, setLeaveTypes] = useState<
    {
      leave_type_id: number;
      leave_type_name: string;
      allowed_leaves: number;
      leave_description: string;
      assign_year: string;
    }[]
  >([]);

  const [formdata, setFormdata] = useState({
    year: "",
    limit: "10",
    order: "",
    status: "any",
  });
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortColumn, setSortColumn] = useState<string>("leave_type_name");



  useEffect(() => {
    fetchLeaveTypes(currentPage);
  }, [currentPage, formdata.year, formdata.limit, formdata.order, sortColumn, sortOrder]);

  const fetchLeaveTypes = async (page: number) => {
    try {
      const url = `leavetypes?page=${page}&limit=${formdata.limit}&order=${formdata.order}&year=${formdata.year}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`;
      const response: any = await LeaveTypes(url);
      // console.log(response.data);
      setLeaveTypes(response.data.data);
      setTotalPages(response.data.totalPages);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error("Error fetching leaveTypes:", error);
    }
  };

  const OnchangeData = (e: any) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const openEditPopup = (leave: any) => {
    setSelectedLeave(leave);
    setModal(true);
  };

  const deleteLeaveHandler = async (leaveId: string) => {
    setSelectedLeaveId(leaveId);
    setDeleteConfirmationVisible(true);
  };

  const confirmDeleteLeave = async () => {
    try {
      await deleteLeave(`leavetypes/${selectedLeaveId}`);
      fetchLeaveTypes(currentPage);
      toast.success("leave deleted successfully!");
    } catch (error) {
      console.error("Error deleting leave:", error);
      toast.error("Failed to delete leave!");
    } finally {
      setDeleteConfirmationVisible(false);
    }
  };

  const cancelDeleteLeave = () => {
    setDeleteConfirmationVisible(false);
  };

  const handleEditLeaveUpdate = () => {
    fetchLeaveTypes(currentPage);
    setModal(false);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSort = (column: string) => {
    const order = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(order);
    setSortColumn(column);
  };
  return (
    <>
      <LeaveFormComponent
        isModal={isModal}
        handleClose={() => setModal(false)}
        leave={selectedLeave}
        onUpdate={handleEditLeaveUpdate}
      />
      <OptionsTemplate
        setModal={setModal}
        leaveTypes={leaveTypes}
        deleteSelected={deleteLeaveHandler}
        openEditPopup={openEditPopup}
        confirmDeleteLeave={confirmDeleteLeave}
        cancelDeleteLeave={cancelDeleteLeave}
        isDeleteConfirmationVisible={isDeleteConfirmationVisible}
        OnchangeData={OnchangeData}
        formdata={formdata}
        currentPage={currentPage}
        paginate={paginate}
        totalPages={totalPages}
        totalRecords={totalRecords}
        totalCount={totalCount}
        handleSort={handleSort}
        sortOrder={sortOrder}
        sortColumn={sortColumn}
      />
    </>
  );
};

export default OptionsComponent;
