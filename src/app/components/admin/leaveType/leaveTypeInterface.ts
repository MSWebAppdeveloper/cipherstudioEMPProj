export interface LeaveTypeProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  leaveTypes: {
    leave_type_id: number;
    leave_type_name: string;
    allowed_leaves: number;
    leave_description: string;
    assign_year: string;
  }[];
  deleteSelected: (leave: any) => void;
  openEditPopup: (leave: any) => void;
  confirmDeleteLeave: (leave: any) => void;
  cancelDeleteLeave: (leave: any) => void;
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
