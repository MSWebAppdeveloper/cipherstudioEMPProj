export interface UserProps {
  formdata: {
    name: string;
    email: string;
    department: string;
    userRole: string;
    isActive: boolean;
    limit: any;
    order:any;
    shift:string;
  };
  allUsers?: Array<{
    id: string;
    name: string;
    email: string;
    department: string;
    userRole: string;
    isActive: boolean;
    shift:string;
  }>;
  filterName: string;
  setFilterName: React.Dispatch<React.SetStateAction<string>>;

  handleFilterChange: (
    type: "userRole",
    value: string | [string, string]
  ) => void;
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
  deleteSelected: (user: any) => void;
  openEditPopup: (user: any) => void;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  confirmDeleteUser: (user: any) => void;
  cancelDeleteUser: (user: any) => void;
  isDeleteConfirmationVisible:boolean;
  handleToggleUserStatus: (userId: string, isActive: boolean) => void;
  currentPage: any;
  totalPages: any;
  totalRecords: any;
  paginate: any;
  totalCount: any;
  // limit: any;
  OnchangeData: (e: any) => void;
  handleSort: (column: string) => void;
  sortOrder: "asc" | "desc";
  sortColumn: string;
  handleCalendarClick:any
}