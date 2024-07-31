"use client"
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createProject, updateProject } from "@/services/api";
import ProjectFormTemplate from "./projectFormTemplte";
import { ProjectFormValues } from "./projectFormInterface";

const initialFormValues: ProjectFormValues = {
  id: 0,
  projectName: "",
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

  useEffect(() => {
    setFormData({
      id: project?.id || 0,
      projectName: project?.projectName || "",

    });
  }, [project]);



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
        projectName: formData.projectName,

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
        toast.error("Project is already in the database");
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
    />
  );
};

export default ProjectFormComponent;
