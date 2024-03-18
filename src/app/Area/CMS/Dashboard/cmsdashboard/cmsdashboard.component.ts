import { ChangeDetectorRef, Component } from '@angular/core';
import { DashboardService } from '../Dashboard.service';
import { ILoginRequest,IAutoCompleateRequest } from 'src/app/Modules/CMS/User/Request/login.model';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { SelectInterface } from 'src/app/Global/Interface/common-interface';

@Component({
  selector: 'app-cmsdashboard',
  templateUrl: './cmsdashboard.component.html',
  styleUrls: ['./cmsdashboard.component.scss']
})
export class CmsdashboardComponent {
SelectOptionvalue:string='';
SelectOptionText:string='';
triggerApi:boolean=false;
public LoginRequest: ILoginRequest = {
  userName: 'Test',
  password: 'va',
};
public AutocompleteRequest: IAutoCompleateRequest ={
  columnName: 'UniversityName',
  searchParam: this.SelectOptionText
}
public AutocompleteRequest2: IAutoCompleateRequest ={
  columnName: 'Caste',
  searchParam: ''
}
automodelValue:string ='';
departments: SelectInterface[] = []
jsondata:any[]=[];
disable:boolean = false;
constructor(private dashboardService: DashboardService,private globalService: GlobalService,private cdr: ChangeDetectorRef) {
}
ngOnInit() {
  this.CallService();
}
ngAfterViewInit(): void {

}
CallService(){
this.dashboardService.getDepartmentDetails().subscribe({
  next: (Response) => {
    if(Response.data != null){
      this.jsondata = Response.data;

      this.departments = Response.data.map((item: any) => ({
        text: item.departmentName,
        value: item.departmentCode
      }));
    //this.globalService.CreateOptions("DashboardType","departmentCode","departmentName","status",Response.data)
    }
  },
});
}
onModelValueChange(value: any) {
  // Handle the change event here
  console.log('Model value changed:', value);
}
onModelValueChanges(options: { value: string, text: string }) {
  // Handle the change event here
  this.SelectOptionText = options.value;
  console.log('Model value changed:', options.value);
  console.log('Model text changed:', options.text);
}
buttonclick(){
  console.log("Test")
  this.disable =true;
  console.log(this.AutocompleteRequest)
  this.AutocompleteRequest.columnName = "InstituionName";
  console.log(this.AutocompleteRequest)
  this.triggerApi =true;
}
chage(){
  return this.AutocompleteRequest
}
}
