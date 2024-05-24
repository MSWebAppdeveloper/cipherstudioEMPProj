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
  }[];
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
  total_days: number;
  createdAt:any;
  onDelete: (e: any) => void;
  getColorForStatus: (e: any) => void;
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
  };
  leaveTypes: {
    leave_type_id: number;
    leaveType: string;
    allowed_leaves: number;
    leaves_left: number;
    total_days: number;
    totaltakenleave: number;
    extra_leaves: number;
    pending_leaves:number;
  }[];
}
