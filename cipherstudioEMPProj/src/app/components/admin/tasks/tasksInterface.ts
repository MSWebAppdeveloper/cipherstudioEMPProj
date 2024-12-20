// taskInterface.ts
export interface TaskInterface {
  id: number;
  projectName: string;
  userName: string;
  title: string;
  description: string;
  status: string;
  estimatedTime: string;
  takenTime: string;
  createdAt: string;
  assignedTo: string;
}

export interface TaskTemplateProps {
  taskHistory: TaskInterface[];
  filterName: string;
  filterStatus: string;
  setFilterName: (value: any) => void;
  allUsers: any[];
  currentPage: number;
  paginate: (pageNumber: number) => void;
  totalPages: number;
  totalRecords: number;
  totalCount: number;
  OnchangeData: (e: any) => void;
  formdata: any;
  handleFilterChange: (
    type: "name" | "date" |"columns",
    value: string | [string, string] |any
  ) => void;
  handleSort: (column: string) => void;
  sortOrder: "asc" | "desc";
  sortColumn: string;
  isLoading: boolean;
  fetchAllRecords: () => void;
  isDataFetched: boolean;
  setIsDataFetched: (value: boolean) => void;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  confirmDeleteTask: (taskId: any) => void;
  cancelDeleteTask: (taskId: any) => void;
  deleteSelected: (task: any) => void;
  openEditPopup: (task: any) => void;
  isDeleteConfirmationVisible: boolean;
  selectedTaskId: any;
  downloadData: TaskInterface[];
  fetchTasksByStatus: any;
  startDate: any;
  endDate: any;
  setStartDate: any;
  setEndDate: any;
}
