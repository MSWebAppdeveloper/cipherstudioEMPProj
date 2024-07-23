// taskInterface.ts
export interface TaskInterface {
    id: number;
    title: string;
    description: string;
    status: string;
    estimatedTime: string;
    timeTaken: string;
    createdAt: string;
  }

  export interface TaskTemplateProps {
    taskHistory: TaskInterface[];
    filterName: string;
    filterStatus: string;
    setFilterName: (value:any) => void;
    allUsers: any[];
    currentPage: number;
    paginate: (pageNumber: number) => void;
    totalPages: number;
    totalRecords: number;
    totalCount: number;
    OnchangeData: (e: any) => void;
    formdata: any;
    handleFilterChange: (type: "status" | "name", value: string) => void;
    handleSort: (column: string) => void;
    sortOrder: "asc" | "desc";
    sortColumn: string;
    isLoading: boolean;
    fetchAllRecords: () => void;
    isDataFetched: boolean;
    setIsDataFetched: (value: boolean) => void;
  }