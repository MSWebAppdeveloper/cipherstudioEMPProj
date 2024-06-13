export interface leaveApplicationsInterface {
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
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
  userName: string;
  id: string;
  total_days: number;
  approveApplication: (e: any) => void;
  rejectApplication: (e: any) => void;
  currentPage: any;
  totalPages: any;
  totalRecords: any;
  paginate: any;
  totalCount: any;
  OnchangeData: (e: any) => void;
  formdata: {
    limit: any;
    order: any;
    status: any;
  };
  filterName: string;
  setFilterName: React.Dispatch<React.SetStateAction<string>>;

  handleFilterChange: (
    type: "status",
    value: string | [string, string]
  ) => void;
  handleSort: (column: string) => void;
  sortOrder: "asc" | "desc";
  sortColumn: string;
}
