export interface RequestInterface {
  deleteSelected: (user: any) => void;
  openEditPopup: (user: any) => void;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: any;
  leaveHistory: {
    leaveType: string;
    startDate: string;
    endDate: string;
    reason: string;
    status: string;
    total_days: number;
    createdAt:any;
    selectedYear:any;
  }[];
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
  total_days: number;
  createdAt:any;
  selectedYear:any;
  onDelete: (e: any) => void;
  isDeleteConfirmationVisible:boolean;
  confirmDeleteUser: (user: any) => void;
  cancelDeleteUser: (user: any) => void;
  selectedUserId:any;
  currentPage: any;
  totalPages: any;
  totalRecords: any;
  paginate: any;
  totalCount: any;
  // limit: any;
  OnchangeData: (e: any) => void;
  formdata: {
    limit: any;
    order: any;
    year:any;
    status:any;
  };
  leaveTypes: {
    leave_type_id: number;
    leave_type_name: string;
    leaveType: string;
    allowedLeaves: number;
    leavesLeft: number;
    total_days: number;
    totalTakenLeave: number;
    extraTakenLeaves: number;
    pendingLeaves:number;
    assign_year:string;
  }[];
  handleSort: (column: string) => void;
  sortOrder: "asc" | "desc";
  sortColumn: string;
}
