export interface IInstitutionRequest {
  institutionName:string;
  address1:string;
  address2:string;
  pincode:string;
  postofficeName:string;
  districtname:string;
  stateName:string;
  emailid:string;
  mobileNumer:string;
  alternateMobileNumer:string;
  landline:string;
  institutionType:string;
  staffIdprefix:string;
  entredBy:string;
  modifiedBy:string;
  modifiedDate?:Date;
}
export interface IPostoffice{
  Pincode:string;
}
