"use client";
import React, { useEffect, useState } from "react";
import { Projects, deleteProject } from "@/services/api";
import toast from "react-hot-toast";
import ProjectsTemplate from "./projectsTemplate";
import ProjectFormComponent from "../projectForm/page";
import ProjectLoading from "@/skeletonComponent/ProjectLoading";

const ProjectComponent: React.FC = () => {
    const [isModal, setModal] = useState<boolean>(false);
    const [selectedProject, setSelectedProject] = useState<any>(null);
    const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] =
        useState<boolean>(false);
    const [selectedProjectId, setSelectedProjectId] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false)
    const [projects, setProjects] = useState<
        {
            id: number;
            projectName: string;
            assignedTo: string[];
            createdBy: string;
            startDate: string;
        }[]
    >([]);

    const [formdata, setFormdata] = useState({
        year: "",
        limit: "10",
        order: "",
        status: "any",
    });
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [sortColumn, setSortColumn] = useState<string>("projectName");



    useEffect(() => {
        fetchProjects(currentPage);
    }, [currentPage, formdata.year, formdata.limit, formdata.order, sortColumn, sortOrder]);

    const fetchProjects = async (page: number) => {
        try {

            const url = `project?page=${page}&limit=${formdata.limit}&order=${formdata.order}&year=${formdata.year}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`;
            const response: any = await Projects(url);
            setProjects(response.data.data.map((proj: any) => ({
                ...proj,
                assignedTo: proj.assignedTo || [], // Ensure it defaults to an empty array if not present
                createdBy: proj.createdBy || "",
            })));
            setTotalPages(response.data.totalPages);
            setTotalCount(response.data.totalCount);
        } catch (error) {
            console.error("Error fetching Projects:", error);
        }
    };

    const OnchangeData = (e: any) => {
        setFormdata({
            ...formdata,
            [e.target.name]: e.target.value,
        });
    };

    const openEditPopup = (project: any) => {
        setSelectedProject(project);
        setModal(true);
    };

    const deleteProjectHandler = async (id: string) => {
        setSelectedProjectId(id);
        setDeleteConfirmationVisible(true);
    };

    const confirmDeleteProject = async () => {
        try {
            await deleteProject(`project/${selectedProjectId}`);
            fetchProjects(currentPage);
            toast.success("Project deleted successfully!");
        } catch (error) {
            console.error("Error deleting Project:", error);
            toast.error("Failed to delete Project!");
        } finally {
            setDeleteConfirmationVisible(false);
        }
    };

    const cancelDeleteProject = () => {
        setDeleteConfirmationVisible(false);
    };

    const handleEditProjectUpdate = () => {
        fetchProjects(currentPage);
        setModal(false);
    };

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handleSort = (column: string) => {
        const order = sortOrder === "asc" ? "desc" : "asc";
        setSortOrder(order);
        setSortColumn(column);
    };
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 1000)
        return () => clearTimeout(timer)
    }, [])
    if (isLoading) {
        return <ProjectLoading />
    }

    return (
        <>
            <ProjectFormComponent
                isModal={isModal}
                handleClose={() => setModal(false)}
                project={selectedProject}
                onUpdate={handleEditProjectUpdate}
            />
            <ProjectsTemplate
                setModal={setModal}
                projects={projects}
                deleteSelected={deleteProjectHandler}
                openEditPopup={openEditPopup}
                confirmDeleteProject={confirmDeleteProject}
                cancelDeleteProject={cancelDeleteProject}
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

export default ProjectComponent;
