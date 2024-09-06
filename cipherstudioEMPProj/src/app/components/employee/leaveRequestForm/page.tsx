"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LeaveTypes, RequestLeave } from "@/services/api";
import LeaveRequestFormTemplate from "./LeaveRequestFormTemplate";
import { LeaveFormData } from "./LeaveRequestFormInterface";


const initialValues: LeaveFormData = {
  leaveType: "",
  startDate: "",
  endDate: "",
  reason: "",
};
interface LeaveRequestFormComponentProps {
  isModal: boolean;
  handleClose: () => void;
  user: any;
  onUpdate: () => void;
}
const LeaveRequestFormComponent: React.FC<LeaveRequestFormComponentProps> = ({
  isModal,
  handleClose,
  user,
  onUpdate,
}) => {
  const [formdata, setFormdata] = useState(initialValues);
  const [leaveTypes, setLeaveTypes] = useState<{ leave_type_id: number; leave_type_name: string }[]>([]);
  const [UserId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchLeaveTypes = async () => {
      try {
        const url = `leavetypes`;
        const response: any = await LeaveTypes(url);
        setLeaveTypes(response.data.data);
      } catch (error) {
        console.error("Error fetching leaveTypes:", error);
      }
    };

    fetchLeaveTypes();
    const fetchUserId = async () => {
      try {

        // const loggedInUserId = await fetchLoggedInUserId();
        const UserId: any = localStorage.getItem("UserId");
        setUserId(UserId);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };
 
    fetchUserId();
  }, []);


  const dataChange = (e: any) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = async (values: LeaveFormData, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
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
        onUpdate();
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
    <LeaveRequestFormTemplate
      dataChange={dataChange}
      handleOnSubmit={handleOnSubmit}
      formdata={formdata}
      leaveTypes={leaveTypes}
      isModal={isModal}
      handleClose={handleClosePopup}
      loading={loading}
    />
  );
};

export default LeaveRequestFormComponent;
