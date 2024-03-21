export interface ILoginRequest {
  userName: string;
  password: string;
}
export interface IAutoCompleateRequest {
  columnName: string | undefined;
  searchParam: string | undefined;
}
export interface IDepartmentResponse {
  departmentName: string;
  departmentCode: string;
  // status:string;
}

export class IDatatable {
  showFotter: boolean;
  tableColumnsName: string[];
  apiColumnsName: string[];
  showPagination: boolean;
  jsonData: any;
  shorting: boolean;

  constructor() {
    this.showFotter = true;
    this.tableColumnsName = ['Name1', 'Name2', 'Name3'];
    this.apiColumnsName = ['Name1', 'Name2', 'Name3'];
    this.showPagination = true;
    this.shorting = true;
  }
}
