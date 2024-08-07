export interface ProjectProps {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    projects: {
        id: number;
        projectName: string;
        assignedTo: string[];
        createdBy: string; 
        startDate: string; 
    }[];
    deleteSelected: (project: any) => void;
    openEditPopup: (project: any) => void;
    confirmDeleteProject: (project: any) => void;
    cancelDeleteProject: (project: any) => void;
    isDeleteConfirmationVisible: boolean;
    OnchangeData: (e: any) => void;
    formdata: {
        year: any;
        limit: any;
        order: any;
        status: any;
    };
    currentPage: any;
    totalPages: any;
    totalRecords: any;
    paginate: any;
    totalCount: any;
    handleSort: (column: string) => void;
    sortOrder: "asc" | "desc";
    sortColumn: string;
}
