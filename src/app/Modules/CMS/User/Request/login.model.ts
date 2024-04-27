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

export interface IStaffTypeResponse {
  staffType: string;
  count: string;
}

export interface IDepartmentNameResponse {
  departmentName: string;
  count: string;
}
export interface IBatchResponse {
  batch: string;
  count: string;
}
export interface IClassResponse {
  courseWithYearandSection: string;
  count: string;
}
