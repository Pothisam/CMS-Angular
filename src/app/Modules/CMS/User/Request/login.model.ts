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
  status: string;
}


