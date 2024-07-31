"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Projects, RequestTask, updateTaskDetails } from "@/services/api";
import TasksFormTemplate from "./tasksFormTemplate";

const initialValues = {
  id: null,
  projectName: "",
  title: "",
  description: "",
  status: "",
  estimatedTime: "",
  takenHours: "",
  comments: "",
};

interface TaskFormComponentProps {
  isModal: boolean;
  handleClose: () => void;
  task: any;
  onUpdate: () => void;
}

const TasksFormComponent: React.FC<TaskFormComponentProps> = ({
  isModal,
  handleClose,
  task,
  onUpdate,
}) => {
  const [formdata, setFormdata] = useState(initialValues);
  const [UserId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [projects, setProjects] = useState<{ id: number; projectName: string }[]>([]);
  const [tasks, setTasks] = useState<any[]>([initialValues]);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const UserId: any = localStorage.getItem("UserId");
        setUserId(UserId);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    if (task) {
      setFormdata(task);
    } else {
      setFormdata(initialValues);
    }
  }, [task]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const url = `project`;
        const response: any = await Projects(url);
        setProjects(response.data.data);
      } catch (error) {
        console.error("Error fetching Projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const dataChange = (e: any) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleInProgressTaskSelect = (task: any) => {
    setFormdata(task);
  };

  const handleOnSubmit = async(values: any, { setSubmitting }: any) => {
    setLoading(true);
    try {
      const requestData = {
        ...values,
        UserId: UserId,
        userName: localStorage.getItem("name"),
      };
      const url = `tasks/`;
      if (formdata.id) {
        const response: any = await updateTaskDetails(`tasks/${formdata.id}`, requestData);
        if (response.status === 200) {
          toast.success("Status updated successfully");
          setFormdata(initialValues);
        } else {
          toast.error(response.data);
        }
      } else {
        const response: any = await RequestTask(url, requestData);
        if (response.status === 201) {
          toast.success("Status submitted successfully");
          setFormdata(initialValues);
        } else {
          toast.error(response.data);
        }
      }

      setFormdata(initialValues);
      handleClose();
      onUpdate();
    } catch (error: any) {
      console.error("Error submitting Status request:", error.response.data.error);
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const handleClosePopup = () => {
    setFormdata(initialValues); // Clear formData before closing
    handleClose();
  };


  return (
    <TasksFormTemplate
      dataChange={dataChange}
      handleOnSubmit={handleOnSubmit}
      formdata={formdata}
      isModal={isModal}
      handleClose={handleClosePopup}
      loading={loading}
      projects={projects}
      handleInProgressTaskSelect={handleInProgressTaskSelect}
      tasks={tasks}
    />
  );
};

export default TasksFormComponent;
