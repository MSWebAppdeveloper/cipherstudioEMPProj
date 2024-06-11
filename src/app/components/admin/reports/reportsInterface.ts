export interface ReportEntry {
  entry: number;
  userName: string;
  date: string;
  timeIn: string;
  timeOut: string;
  totalHours: string;
  status: string;
}

export interface formValues {
  id: string;
  name: string;
  email: string;
  department: string;
}

export interface ReportsInterface {
  attendance: ReportEntry[];
  reports:ReportEntry[];
  filterName: string;
  setFilterName: (value: any) => void;

  handleFilterChange: (
    type: "name" | "date",
    value: string | [string, string]
  ) => void;
  allUsers: Array<{
    id: string;
    name: string;
    email: string;
    department: string;
  }>;
  currentPage: any;
  totalPages: any;
  totalRecords: any;
  paginate: any;
  totalCount: any;
  // limit: any;
  OnchangeData: (e: any) => void;
  formdata: {
    limit: any;
    order:any;
    status: any;
  };
  startDate:any;
  endDate:any;
  setStartDate:any;
  setEndDate:any;
  downloadData: ReportEntry[];
  fetchAllRecords: () => void;
  handleSort: (column: string) => void;
  sortOrder: "asc" | "desc";
  sortColumn: string;
}
