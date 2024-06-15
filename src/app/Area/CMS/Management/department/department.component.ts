import { Component, OnInit } from '@angular/core';
import { IAddDepartmentRequest } from 'src/app/Modules/CMS/department/department';
import { ManagementService } from '../management.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
})
export class DepartmentComponent implements OnInit {
  departmentcode: string = '';
  public request: IAddDepartmentRequest = {
    departmentname: '',
  };
  constructor(private managementService: ManagementService) {}

  ngOnInit() {}
  onValueChange() {
    if (this.request.departmentname.length == 2) {
      this.GetDepartmentcode();
    }
  }
  GetDepartmentcode() {
    this.managementService.getdepartmentcode(this.request).subscribe({
      next: (Response) => {
        this.departmentcode = Response.data;
      },
    });
  }
}
