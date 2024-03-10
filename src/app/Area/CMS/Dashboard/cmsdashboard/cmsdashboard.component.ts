import { Component } from '@angular/core';
import { DashboardService } from '../Dashboard.service';
import { ILoginRequest } from 'src/app/Modules/CMS/User/Request/login.model';
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
public LoginRequest: ILoginRequest = {
  userName: 'Test',
  password: 'va',
};
departments: SelectInterface[] = []
constructor(private dashboardService: DashboardService,private globalService: GlobalService) {
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
      this.departments = Response.data.map((item: any) => ({
        text: item.departmentName,
        value: item.departmentCode
      }));
    this.globalService.CreateOptions("DashboardType","departmentCode","departmentName","status",Response.data)
    }
  },
});
}
onModelValueChange(value: any) {
  // Handle the change event here
  console.log('Model value changed:', value);
}
onModelValueChanges(option: { value: string, text: string }) {
  // Handle the change event here
  console.log('Model value changed:', option.value);
  console.log('Model text changed:', option.text);
}
}
