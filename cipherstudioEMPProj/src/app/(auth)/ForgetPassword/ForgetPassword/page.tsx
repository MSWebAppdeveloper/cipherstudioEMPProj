"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { registerUser, updateUserDetails } from "@/services/api";
import ForgetPasswordTemplate from "./ForgetPasswordTemplate";

const initialFormValues = {
  id: "",
  email: "",
};



const ForgetPasswordComponent: React.FC = () => {
  const [formData, setFormData] = useState(initialFormValues);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<registerErrorType>({});

  useEffect(() => {
    setFormData({
      id: "",
      email:  "",
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      
      [name]: value,
    }));
  };

  const handleSubmit = async(values: any, { setSubmitting }: any) => {

    try {
      setLoading(true);
      const userData = {
        email: formData.email,
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
         
        }
      } else {
        // Create new user
        const response: any = await registerUser("employee/users", userData);

        if (response.status === 201) {
          toast.success("User added successfully");
          setLoading(false);
          setFormData(initialFormValues);
         
        }
      }
    } catch (error: any) {
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
  
  };

    // Transform shift data into required format
   

  return (
    <ForgetPasswordTemplate
      formdata={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
     
  
      errors={errors}
      loading={loading}
    
    />
  );
};

export default ForgetPasswordComponent;
