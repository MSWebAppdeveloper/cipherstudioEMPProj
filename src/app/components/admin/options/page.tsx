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

  const [currentYear, setCurrentYear] = useState(1);
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
  });

  useEffect(() => {
    fetchLeaveTypes();
  }, [formdata.year]);

  const fetchLeaveTypes = async () => {
    try {
      const url = `leavetypes?year=${formdata.year}`;
      const response: any = await LeaveTypes(url);
      // console.log(response.data);
      setLeaveTypes(response.data);
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
      fetchLeaveTypes();
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
    fetchLeaveTypes();
    setModal(false);
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
      />
    </>
  );
};

export default OptionsComponent;
