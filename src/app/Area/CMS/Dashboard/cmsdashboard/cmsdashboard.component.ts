import { ChangeDetectorRef, Component } from '@angular/core';
import { DashboardService } from '../Dashboard.service';
import {
  ILoginRequest,
  IAutoCompleateRequest,
  IDepartmentResponse,
  IStaffTypeResponse,
  IDepartmentNameResponse,
  IBatchResponse,
  IClassResponse,
} from 'src/app/Modules/CMS/User/Request/login.model';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { SelectInterface } from 'src/app/Global/Interface/common-interface';
import { ITableSettings } from 'src/app/Shared/MatHelper/table/table.model';

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
  staffTypeList: IStaffTypeResponse[] = [];
  departmentNameList: IDepartmentNameResponse[] = [];
  ugBatchList: IBatchResponse[] = [];
  pgBatchList: IBatchResponse[] = [];
  ugclassList: IClassResponse[] = [];
  pgclassList: IClassResponse[] = [];
  //  myDatatable = new IDatatable({

  //  });
  public tableSettings: ITableSettings = {
    showFotter: false,
    showPagination: true,
    jsonData: undefined,
    shorting: true,
    slno: false,
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
          {
            button: true,
            buttondata: 'departmentCode',
            buttons: ['edit', 'delete'],
          },
        ],
        buttonlabel: 'departmentCode',
      },
    ],
    columnSticky: [0, 1],
    headerSticky: true,
    filter: false,
  };
  public tableStaffType: ITableSettings = {
    showFotter: true,
    showPagination: false,
    jsonData: undefined,
    shorting: true,
    slno: true,
    checkbox: false,
    columns: [
      {
        title: 'Staff Type',
        data: 'staffType',
        short: true,
        width: 80,
      },
      {
        title: 'Count',
        data: 'count',
        short: true,
        width: 10,
        class: 'text-end',
        footergroup: [{ sumfunction: true }],
      },
    ],
    columnSticky: [0],
    headerSticky: true,
    filter: false,
  };
  public tabledepartment: ITableSettings = {
    showFotter: true,
    showPagination: false,
    jsonData: undefined,
    shorting: false,
    slno: true,
    checkbox: false,
    columns: [
      {
        title: 'Department Name',
        data: 'departmentName',
        short: true,
        width: 80,
      },
      {
        title: 'Count',
        data: 'count',
        short: true,
        width: 10,
        class: 'text-end',
        footergroup: [{ sumfunction: true }],
      },
    ],
    columnSticky: [],
    headerSticky: true,
    filter: false,
  };
  public tablBatchWise: ITableSettings = {
    showFotter: true,
    showPagination: false,
    jsonData: undefined,
    shorting: false,
    slno: true,
    checkbox: false,
    columns: [
      {
        title: 'Batch',
        data: 'batch',
        short: true,
        width: 80,
      },
      {
        title: 'Count',
        data: 'count',
        short: true,
        width: 10,
        class: 'text-end',
        footergroup: [{ sumfunction: true }],
      },
    ],
    columnSticky: [],
    headerSticky: true,
    filter: false,
  };

  public tableClasswise: ITableSettings = {
    showFotter: true,
    showPagination: false,
    jsonData: undefined,
    shorting: false,
    slno: true,
    checkbox: false,
    columns: [
      {
        title: 'Course Name',
        data: 'courseWithYearandSection',
        short: true,
        width: 80,
      },
      {
        title: 'Count',
        data: 'count',
        short: true,
        width: 10,
        class: 'text-end',
        footergroup: [{ sumfunction: true }],
      },
    ],
    columnSticky: [],
    headerSticky: true,
    filter: false,
  };

  ConvertToDate(value: any): string {
    // Example implementation, replace with your actual date conversion logic
    return value + ' 1234';
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
  SelectedValue: string = 'BIO4013';
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
    this.getdashboardservice();
  }
  ngAfterViewInit(): void {}
  CallService() {
    this.dashboardService.getDepartmentDetails().subscribe({
      next: (Response) => {
        if (Response.data != null) {
          this.departmentList = Response.data;
          //this.tableSettings.jsonData = Response.data;
          // this.departments = Response.data.map((item: any) => ({
          //   text: item.departmentName,
          //   value: item.departmentCode,
          // }));
          //this.globalService.CreateOptions("DashboardType","departmentCode","departmentName","status",Response.data)
        }
      },
    });
  }
  getdashboardservice() {
    this.dashboardService.getdashboardList().subscribe({
      next: (Response) => {
        if (Response.data != null) {
          this.tableStaffType.jsonData = Response.data.staffCount;
          this.staffTypeList = Response.data.staffCount;
          this.departmentNameList = Response.data.departmentCount;
          this.ugBatchList = Response.data.getStudentCountUG;
          this.pgBatchList = Response.data.getStudentCountPG;
          this.ugclassList = Response.data.studentClassWiseUG;
          this.pgclassList =Response.data.studentClassWisePG;
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
  onThemeChange(value: any) {
    this.globalService.switchTheme(value.value);
  }
  buttonclick() {
    this.disable = true;
    this.AutocompleteRequest.columnName = 'InstituionName';

    //this.triggerApi =true;
    console.log(this.triggerApi);
    console.log(this.SelectedValue);
    console.log(this.tableSettings);
    // this.SelectedValue ="BIO4013";
  }
  chage() {
    return this.AutocompleteRequest;
  }
}
