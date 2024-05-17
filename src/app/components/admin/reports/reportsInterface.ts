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
  filterName: string;
  setFilterName: React.Dispatch<React.SetStateAction<string>>;

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
  getColorForStatus: any;
  totalCount: any;
  // limit: any;
  OnchangeData: (e: any) => void;
  formdata: {
    limit: any;
    order:any;
  };
  handleOrderChange: (e: any) => void;
}
