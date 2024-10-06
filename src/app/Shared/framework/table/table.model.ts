export class ITableSettings {
  showFotter: boolean;
  showPagination: boolean;
  jsonData: any;
  shorting: boolean;
  slno: boolean;
  checkbox: boolean;
  class?:string;
  columns: {
    title: string;
    data: string;
    class?: string;
    short?: boolean;
    width?: number;
    render?: any;
    buttongroup?: {
      button?: boolean;
      buttons?: string[];
      buttondata?: string;
      conditions?:string[];
      click?:string[];
      toggle?:string[];
    }[];
    footergroup?: {
      sumfunction?: boolean;
    }[];
    buttonlabel?: string;
  }[];
  columnSticky: number[];
  headerSticky: boolean;
  filter: boolean;
  constructor() {
    this.showFotter = true;
    this.showPagination = true;
    this.shorting = true;
    this.slno = false;
    this.checkbox = false;
    this.class =''
    this.columns = [
      {
        title: 'string',
        data: 'string',
        class: 'string',
        short: true,
        width: 10,
        render: '',
        buttongroup: [
          {
            button: false,
            buttons: ['edit'],
            buttondata: 'string',
            conditions:['delete|status|Active','toggle|status|Active'],
            click:['delete|sysid|departmentName'],
            toggle:['sysid|API|parameter']
          },
        ],
        footergroup: [
          {
            sumfunction: true,
          },
        ],
        buttonlabel: '',
      },
    ];
    (this.columnSticky = [0, 1, 2]),
      (this.headerSticky = false),
      (this.filter = false);
  }
}
export class ITableDelete{
  API:string;
  PK:string;
  ColumnName:string;
  ParameterName:any;
  Message:string;
  Note:string;
  constructor() {
    this.API ='';
    this.PK = '';
    this.ColumnName = '';
    this.ParameterName ='';
    this.Message = '';
    this.Note = '';
  }
}
export class ITabletoggle{
  API:string;
  PK:string;
  ParameterName:any;
  constructor() {
    this.API ='';
    this.PK = '';
    this.ParameterName ='';
  }
}
