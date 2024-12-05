"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { registerUser, updateUserDetails } from "@/services/api";
import RuleFormTemplate from "./ruleFormTemplate";
import axios from "axios";
import { Toast } from "flowbite-react";

const initialFormValues = {
  id: "",
  name: "",

};

interface RuleFormComponentProps {
  isModal: boolean;
  handleClose: () => void;
  rule: any;
  onUpdate: () => void;
}

const RuleFormComponent: React.FC<RuleFormComponentProps> = ({
  isModal,
  handleClose,
  rule,
  onUpdate,
}) => {
  const [formData, setFormData] = useState(initialFormValues);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ name?: string }>({});

  useEffect(() => {
    setFormData({
      id: rule?.id || "",
      name: rule?.name || "",
     
    });
  }, [rule]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {

    try {
      setLoading(true);
      // if (formData.id) {
      //   // Update existing user
      //   const response: any = await updateUserDetails(
      //     `employee/users/${formData.id}`,
      //     userData
      //   );

      //   if (response.status === 200) {
      //     toast.success("User updated successfully");
      //     setFormData(initialFormValues);
      //     onUpdate();
      //     handleClose();
      //   }
      // } else {
        // Create new user
      

        const response = await axios.post(`http://192.168.1.5:8080/api/rules`, {
          ruleName: formData.name,
          
        });
        if (response.status === 201) {
          toast.success("Create rule successfully");
          setLoading(false);
          setFormData(initialFormValues);
          onUpdate();
          handleClose();
        }else {
          toast.error("Failed to create rule.");
        }
      // }
    } catch (error: any) {
      console.error(error);
      setLoading(false);
      if (error.response && error.response.status === 401) {
        toast.error(error.response.data.error);
      }else if( error.response.status === 400){
        toast.error(error.response.data.error);
      } else {
        toast.error("Something went wrong!");
      }
    } 
  };

  const handleClosePopup = () => {
    setFormData(initialFormValues);
    handleClose();
  };

  return (
    <RuleFormTemplate
      formdata={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      isModal={isModal}
      handleClose={handleClosePopup}
      loading={loading} errors={{
        Name: undefined,
        Email: undefined,
        Password: undefined
      }}    />
  );
};

export default RuleFormComponent;
