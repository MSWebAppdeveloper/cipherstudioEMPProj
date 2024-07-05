"use client"
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import LeaveFormTemplate from "./leaveFormTemplate";
import { registerLeave, updateLeaveDetails } from "@/services/api";

const initialFormValues = {
  leave_type_id: 0,
  leave_type_name: "",
  assign_year: "",
  allowed_leaves: "",
  leave_description: "",
};

interface LeaveFormComponentProps {
  isModal: boolean;
  handleClose: () => void;
  leave: any;
  onUpdate: () => void;
}

const LeaveFormComponent: React.FC<LeaveFormComponentProps> = ({
  isModal,
  handleClose,
  leave,
  onUpdate,
}) => {
  const [formData, setFormData] = useState(initialFormValues);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<registerErrorType>({});

  useEffect(() => {
    setFormData({
      leave_type_id: leave?.leave_type_id || 0,
      leave_type_name: leave?.leave_type_name || "",
      assign_year: leave?.assign_year || "",
      allowed_leaves: leave?.allowed_leaves || "",
      leave_description: leave?.leave_description || "",
    });
  }, [leave]);



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const leaveData = {
        leave_type_name: formData.leave_type_name,
        assign_year: formData.assign_year,
        allowed_leaves: formData.allowed_leaves,
        leave_description: formData.leave_description,
      };

      if (formData.leave_type_id) {
        // Update existing leave
        const response: any = await updateLeaveDetails(
          `leavetypes/${formData.leave_type_id}`,
          leaveData
        );

        if (response.status === 200) {
          toast.success("Leave updated successfully");
          setLoading(false);
          setFormData(initialFormValues);
          onUpdate();
          handleClose();
        }
      } else {
        // Create new Leave
        const response: any = await registerLeave("leavetypes", leaveData);

        if (response.status === 201) {
          toast.success("Leave added successfully");
          setLoading(false);
          setFormData(initialFormValues);
          onUpdate();
          handleClose();
        }
      }
    } catch (error: any) {
      debugger
      console.error(error); 
      setLoading(false);
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.error;
        toast.error(errorMessage);
        // Handle the error message appropriately, for example, set it in state
        // setErrors({ error: errorMessage });
      }else if(error.response.status === 500){
        toast.error("Leave is already in the database");
      } else {
        const errorMessage = error.response.data;
        toast.error(errorMessage);
        // Handle other types of errors if needed
      }
    }
  };

  const handleClosePopup = () => {
    setFormData(initialFormValues); // Clear formData before closing
    handleClose();
  };

  return (
    <LeaveFormTemplate
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      isModal={isModal}
      handleClose={handleClosePopup}
      errors={errors}
      loading={loading}
    />
  );
};

export default LeaveFormComponent;
