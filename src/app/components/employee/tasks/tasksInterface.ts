// TaskTemplateInterface.ts
export interface TaskTemplateInterface {
  [x: string]: any;
  deleteSelected: (task: any) => void;
  isDeleteConfirmationVisible: boolean;
  selectedTaskId: any;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  taskHistory: any[];
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
  totalCount: number;
  OnchangeData: (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => void;
  formdata: {
    limit: any;
    order: any;
    year: any;
    status: any;
  };
  confirmDeleteTask: (taskId: any) => void;
  cancelDeleteTask: (taskId: any) => void;
  handleSort: (column: string) => void;
  filterName: string;
  sortOrder: "asc" | "desc";
  sortColumn: string;
  handleFilterChange: (
    type: "status",
    value: string | [string, string]
  ) => void;
  openEditPopup: (task: any) => void;
  
}
