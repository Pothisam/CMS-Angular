export interface ICourseResponse {
  courseCode: string;
  courseDurationBD: string;
  courseNameBD:string;
  courseNameSD:string;
  courseType:string;
  departmentName:string;
  status: string;
  entredBy:string;
  entrydate:string;
  modifiedBy:string;
  modifiedDate:string;
}
export interface IAddCourseRequest {
  courseNameSD:string;
  courseNameBD:string;
  courseYearSD:string;
  courseYearBD:string;
  departmentName:string;
  departmentCode:string;
  courseType:string;
  courseTypeBD:string;
}
