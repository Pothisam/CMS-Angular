export class ITableSettings {
  showFotter: boolean;
  showPagination: boolean;
  jsonData: any;
  shorting: boolean;
  slno: boolean;
  checkbox: boolean;
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
      conditions?:string[]
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
            conditions:['delete|status|Active']
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
