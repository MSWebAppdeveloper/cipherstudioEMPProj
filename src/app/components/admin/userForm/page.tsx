"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserFormTemplate from "./FormTemplate";
import { registerUser, updateUserDetails } from "@/services/api";

const initialFormValues = {
  id: "",
  name: "",
  email: "",
  department: "",
  userRole: "",
  shift: "",
};

interface UserFormComponentProps {
  isModal: boolean;
  handleClose: () => void;
  user: any;
  shift: any;
  onUpdate: () => void;
}

const UserFormComponent: React.FC<UserFormComponentProps> = ({
  isModal,
  handleClose,
  user,
  shift,
  onUpdate,
}) => {
  const [formData, setFormData] = useState(initialFormValues);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<registerErrorType>({});

  useEffect(() => {
    setFormData({
      id: user?.id || "",
      userRole: user?.userRole || "",
      name: user?.name || "",
      email: user?.email || "",
      department: user?.department || "",
      shift: user?.shift || "",
    });
  }, [user]);

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
      const userData = {
        name: formData.name,
        email: formData.email,
        department: formData.department,
        userRole: formData.userRole,
        shift: formData.shift,
      };

      if (formData.id) {
        // Update existing user
        const response: any = await updateUserDetails(
          `employee/users/${formData.id}`,
          userData
        );

        if (response.status === 200) {
          toast.success("User updated successfully");
          setLoading(false);
          setFormData(initialFormValues);
          onUpdate();
          handleClose();
        }
      } else {
        // Create new user
        const response: any = await registerUser("employee/users", userData);

        if (response.status === 201) {
          toast.success("User added successfully");
          setLoading(false);
          setFormData(initialFormValues);
          onUpdate();
          handleClose();
        }
      }
    } catch (error: any) {
      debugger;
      console.error(error);
      setLoading(false);
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.error;
        toast.error(errorMessage);
        // Handle the error message appropriately, for example, set it in state
        // setErrors({ error: errorMessage });
      } else if (error.response.status === 500) {
        toast.error("user is already in the database");
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

    // Transform shift data into required format
   

  return (
    <UserFormTemplate
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      isModal={isModal}
      handleClose={handleClosePopup}
      errors={errors}
      loading={loading}
      shift={shift}
    />
  );
};

export default UserFormComponent;
