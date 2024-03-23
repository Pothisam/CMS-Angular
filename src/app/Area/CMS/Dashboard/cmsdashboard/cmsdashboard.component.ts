import { ChangeDetectorRef, Component } from '@angular/core';
import { DashboardService } from '../Dashboard.service';
import {
  ILoginRequest,
  IAutoCompleateRequest,
  IDepartmentResponse,
  IDatatable,
} from 'src/app/Modules/CMS/User/Request/login.model';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { SelectInterface } from 'src/app/Global/Interface/common-interface';

@Component({
  selector: 'app-cmsdashboard',
  templateUrl: './cmsdashboard.component.html',
  styleUrls: ['./cmsdashboard.component.scss'],
})
export class CmsdashboardComponent {
  SelectOptionvalue: string = '';
  SelectOptionText: string = '';
  triggerApi: boolean = true;
  apiUrl: string = '/Department/GetActiveDepartmentListDistinct';
  departmentList: IDepartmentResponse[] = [];
  //  myDatatable = new IDatatable({

  //  });
  public IDatatable: IDatatable = {
    showFotter: false,
    showPagination: true,
    jsonData: undefined,
    shorting: true,
    slno: true,
    checkbox: false,
    columns: [
      {
        title: 'Department Name',
        data: 'departmentName',
        short: true,
        width: 70,
      },
      { title: 'Department Code', data: 'departmentCode', width: 40 },
      {
        title: 'Status',
        data: 'status',
        width: 20,
        render: (value: any) => this.ConvertToDate(value),
      },
      {
        title: 'Action',
        data: 'Mat-Action',
        width: 20,
        buttongroup: [
          { button: true, buttondata: 'departmentCode', buttons: ['edit', 'delete'] },
        ],
        buttonlabel: 'departmentCode'
      },
    ],
    columnSticky: [0, 1],
    headerSticky: true
  };
  ConvertToDate(value: any): string {
    // Example implementation, replace with your actual date conversion logic
    return value + '1234';
  }
  public LoginRequest: ILoginRequest = {
    userName: 'Test',
    password: 'va',
  };
  public AutocompleteRequest: IAutoCompleateRequest = {
    columnName: 'Name',
    searchParam: this.SelectOptionText,
  };
  public AutocompleteRequest2: IAutoCompleateRequest = {
    columnName: 'Caste',
    searchParam: '',
  };
  public AutocompleteRequest3: IAutoCompleateRequest = {
    columnName: 'Name',
    searchParam: 'Pri',
  };
  automodelValue: string = '';
  automodelValue2: string = '';
  automodelValue3: string = '';
  matButtonClicked: string = '';
  autoSelectedOption: string = '';
  SelectedValue: string = 'BIO4013,BUS4026';
  departments: SelectInterface[] = [];
  jsondata: any[] = [];
  disable: boolean = false;
  constructor(
    private dashboardService: DashboardService,
    private globalService: GlobalService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.CallService();
  }
  ngAfterViewInit(): void {}
  CallService() {
    this.dashboardService.getDepartmentDetails().subscribe({
      next: (Response) => {
        if (Response.data != null) {
          this.departmentList = Response.data;
          this.IDatatable.jsonData = Response.data;
          // this.departments = Response.data.map((item: any) => ({
          //   text: item.departmentName,
          //   value: item.departmentCode,
          // }));
          //this.globalService.CreateOptions("DashboardType","departmentCode","departmentName","status",Response.data)
        }
      },
    });
  }
  onModelValueChange(value: any) {
    // Handle the change event here
    console.log('Model value changed:', value);
  }
  onModelValueChanges(options: { value: string; text: string }) {
    // Handle the change event here
    this.SelectOptionText = options.value;
    console.log('Model value changed:', options.value);
    console.log('Model text changed:', options.text);
  }
  buttonclick() {
    this.disable = true;
    this.AutocompleteRequest.columnName = 'InstituionName';

    //this.triggerApi =true;
    console.log(this.triggerApi);
    console.log(this.SelectedValue);
    console.log(this.IDatatable);
    // this.SelectedValue ="BIO4013";
  }
  chage() {
    return this.AutocompleteRequest;
  }
}
