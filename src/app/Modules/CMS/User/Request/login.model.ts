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

export class IDatatable {
  showFotter: boolean;
  showPagination: boolean;
  jsonData: any;
  shorting: boolean;
  slno: boolean;
  checkbox:boolean;
  columns: {
    title: string;
    data: string;
    class?: string;
    short?: boolean;
    width?: number;
    render?:any;
    buttongroup?:{
      button?:boolean;
      buttons?:string[];
      buttondata?:string;
    }[],
    buttonlabel?:string;
  }[];
  columnSticky:number[];
  headerSticky:boolean;

  constructor() {
    this.showFotter = true;
    this.showPagination = true;
    this.shorting = true;
    this.slno = false;
    this.checkbox = false;
    this.columns = [
      {
        title: 'string',
        data: 'string',
        class: 'string',
        short: true,
        width: 10,
        render:'',
        buttongroup:[
          {
            button:false,
            buttons:['edit'],
            buttondata:'string'
          }
        ],
        buttonlabel:''
      },
    ];
    this.columnSticky =[0,1,2],
    this.headerSticky = false
  }
}
