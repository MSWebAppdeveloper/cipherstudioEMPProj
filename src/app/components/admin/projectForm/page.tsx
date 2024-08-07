"use client"
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createProject, updateProject, UserDetails } from "@/services/api";
import ProjectFormTemplate from "./projectFormTemplte";
import { ProjectFormValues } from "./projectFormInterface";

const initialFormValues: ProjectFormValues = {
  id: 0,
  projectName: "",
  assignedTo: [], // Initialize with an empty array
  createdBy: "",
};

interface ProjectFormComponentProps {
  isModal: boolean;
  handleClose: () => void;
  project: any;
  onUpdate: () => void;
}

const ProjectFormComponent: React.FC<ProjectFormComponentProps> = ({
  isModal,
  handleClose,
  project,
  onUpdate,
}) => {
  const [formData, setFormData] = useState(initialFormValues);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<registerErrorType>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [formdata, setFormdata] = useState({
    limit: "10",
    order: "",
    status: "",
  });
  useEffect(() => {
    setFormData({
      id: project?.id || 0,
      projectName: project?.projectName || "",
      assignedTo: project?.assignedTo || [],
      createdBy: project?.createdBy || "",
    });
  }, [project]);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
 
  const handleSubmit = async (values: ProjectFormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
      setLoading(true);
      const projectData = {
        projectName: values.projectName,
        assignedTo: values.assignedTo,
        createdBy: localStorage.getItem("name"),
      };
      if (formData.id) {
        // Update existing Project
        const response: any = await updateProject(
          `project/${formData.id}`,
          projectData
        );

        if (response.status === 200) {
          toast.success("Project updated successfully");
          setLoading(false);
          setFormData(initialFormValues);
          onUpdate();
          handleClose();
        }
      } else {
        // Create new Project
        const response: any = await createProject("project", projectData);

        if (response.status === 201) {
          toast.success("Project added successfully");
          setLoading(false);
          setFormData(initialFormValues);
          onUpdate();
          handleClose();
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
        toast.error("Internal Error");
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
    <ProjectFormTemplate
      formdata={formData}
      dataChange={handleChange}
      handleOnSubmit={handleSubmit}
      isModal={isModal}
      handleClose={handleClosePopup}
      loading={loading}
      allUsers={allUsers}
    />
  );
};

export default ProjectFormComponent;
