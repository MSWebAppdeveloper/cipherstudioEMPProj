export interface LeaveApplicationDownloadData {
  entry: number;
  userName: string;
  leaveType: string;
  createdAt: string;
  startDate: string;
  total_days: number;
  status: string;
}

export interface LeaveApplicationsInterface {
  leaveHistory: {
    id: string;
    leaveType: string;
    startDate: string;
    endDate: string;
    total_days: number;
    reason: string;
    status: string;
    userName: string;
  }[];
  allUsers: Array<{
    id: string;
    name: string;
    email: string;
    department: string;
  }>;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
  userName: string;
  id: string;
  total_days: number;
  approveApplication: (id: string) => void;
  rejectApplication: (id: string) => void;
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  paginate: (pageNumber: number) => void;
  totalCount: number;
  OnchangeData: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  formdata: {
    limit: any;
    order: any;
    status: any;
  };
  filterStatus: string;
  filterName: string;
  setFilterName: (value: any) => void;
  handleFilterChange: (type: "status" | "name", value: string) => void;
  handleSort: (column: string) => void;
  sortOrder: "asc" | "desc";
  sortColumn: string;
  downloadData: LeaveApplicationDownloadData[];
  isLoading: any;
  fetchAllRecords: () => void;
  isDataFetched: boolean;
  setIsDataFetched: any;
}
