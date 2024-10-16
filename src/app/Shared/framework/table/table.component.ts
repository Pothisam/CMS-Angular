import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  input,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ITableDelete, ITableHistory, ITableSettings, ITabletoggle } from './table.model';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { IModalSettings } from '../model/model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FrameworkService } from '../framework.service';
import { IHistoryRecordSettings } from '../historyrecord/historyrecord';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any[]>();
  datalist: any;
  public _recordDeleteDetails: ITableDelete = new ITableDelete();
  public _recordHistoryDetails: ITableHistory = new ITableHistory();
  public _recordtoggleDetails: ITabletoggle = new ITabletoggle();
  public _modalSettings: IModalSettings = new IModalSettings();
  public _tableSettings: ITableSettings | undefined;
  public _historyrecordSettings: IHistoryRecordSettings = new IHistoryRecordSettings();

  @Input()
  set tableSettings(value: ITableSettings | undefined) {
    if (this._tableSettings !== value) {
      this._tableSettings = value;
      this.prepareTable();
      this.tableSettingsChange.emit(this._tableSettings);
    }
  }
  get tableSettings(): ITableSettings | undefined {
    return this._tableSettings;
  }

  @Output() tableSettingsChange = new EventEmitter<
    ITableSettings | undefined
  >();

  public _gridEdit: string = '';
  @Input()
  set matEditClick(value: any) {
    if (this._gridEdit === value) {
      return;
    }
    this._gridEdit = value;
    this.matEditClickChange.emit(this._gridEdit);
  }
  get matEditClick() {
    return this._gridEdit;
  }
  @Output() matEditClickChange = new EventEmitter<any>();

  public _gridDelete: string = '';
  public _gridDeleteColumn: string = '';
  @Input()
  set matDeleteClick(value: any) {
    if (this._gridDelete === value) {
      return;
    }
    this._gridDelete = value;
    this.matDeleteClickChange.emit(this._gridDelete);
  }
  get matDeleteClick() {
    return this._gridDelete;
  }
  @Output() matDeleteClickChange = new EventEmitter<any>();

  @Input()
  set jsonData(v: any[]) {
    if (this._tableSettings) {
      this._tableSettings.jsonData = v;
    }
    this.prepareTable();
  }
  @Input() tableName: string = '';

  tableColums: {
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
      conditions?: string[];
    }[];
    footergroup?: {
      sumfunction?: boolean;
    }[];
    buttonlabel?: string;
  }[] = [];
  public displayedColumns: string[] = [];
  selection = new SelectionModel<any>(true, []);
  area: string = this.globalService.getArea();
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private globalService: GlobalService,
    private sanitizer: DomSanitizer,
    private frameworkService: FrameworkService
  ) {}
  sanitizeHTML(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  ngOnInit() {}
  ngAfterViewInit() {
    this.prepareTable();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  prepareTable() {
    this.tableColums = this._tableSettings?.columns || [];
    //this.displayedColumns = this._parameter?.apiColumnsName || [];
    this.displayedColumns =
      this._tableSettings?.columns.map((item) => item.data) ?? [];
    this.datalist = this._tableSettings?.jsonData;

    this.dataSource = new MatTableDataSource(this.datalist);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if (this._tableSettings?.slno == true) {
      this.generateSlno(this.datalist);

      let isExists = this.tableColums.find(
        (column) => column.data === 'autoSlno'
      );
      if (!isExists) {
        if (this._tableSettings.shorting == true) {
          this.tableColums.unshift({
            title: 'Slno',
            data: 'autoSlno',
            width: 5,
            short: true,
          });
        } else {
          this.tableColums.unshift({
            title: 'Slno',
            data: 'autoSlno',
            width: 5,
          });
        }
      }
    }
    if (this._tableSettings?.checkbox == true) {
      let isExists = this.tableColums.find(
        (column) => column.data === 'chSelect'
      );
      if (!isExists) {
        this.tableColums.unshift({
          title: 'chSelect',
          data: 'chSelect',
          width: 5,
        });
      }
    }
  }
  isColumnSticky(index: number): boolean {
    return (this._tableSettings?.columnSticky ?? []).includes(index);
  }
  isHeaderSticky(): boolean {
    return this._tableSettings?.headerSticky ?? true;
  }
  isFootertrue(): boolean {
    return this._tableSettings ? this._tableSettings.showFotter : false;
  }
  generateSlno(data: any[]): void {
    if (data && data.length > 0) {
      data.forEach((item, index) => {
        item.autoSlno = index + 1;
      });
    }
  }
  sortData(sort: Sort) {
    if (sort.direction === '') {
      sort.direction = 'asc'; // Default to 'asc' if sort direction is 'none'
    } else if (sort.direction === 'asc') {
      sort.direction = 'desc'; // Change to 'desc' if current direction is 'asc'
    } else if (sort.direction === 'desc') {
      sort.direction = ''; // Change to 'none' if current direction is 'desc'
    }
  }
  Shorting(sortStatus: Sort) {
    if (sortStatus.direction) {
      this._liveAnnouncer.announce('sorted ${sortStatus.direction}ending');
    } else {
      this._liveAnnouncer.announce('sorting cleared');
    }
  }
  //Grid Button Click
  onMatIconEdit(element: any) {
    this._gridEdit = element['departmentCode'];
    this.matEditClickChange.emit(this._gridEdit);
  }
  public deleteFK: any = {};
  public toggleFK: any = {};
  onMatIconDelete(element: any, event: Event) {
    const targetElement = event.target as HTMLElement;
    const actionColumn = this._tableSettings?.columns.find(
      (column) => column.data === 'Mat-Action'
    );
    if (
      actionColumn &&
      actionColumn.buttongroup &&
      actionColumn.buttongroup[0] &&
      actionColumn.buttongroup[0].click &&
      actionColumn.buttongroup[0].click.some((x) => x.startsWith('delete|'))
    ) {
      const deleteAction = actionColumn.buttongroup[0].click.find((x) =>
        x.startsWith('delete|')
      );
      if (deleteAction) {
        const parts = deleteAction.split('|');
        this._recordDeleteDetails.PK = parts[1] ?? '';
        this._recordDeleteDetails.ColumnName = parts[2] ?? '';
        this._recordDeleteDetails.API = parts[3] ?? '';
        this._recordDeleteDetails.ParameterName = parts[4] ?? '';
        this._recordDeleteDetails.Message = parts[5] ?? '';
        this._recordDeleteDetails.Note = parts[6] ?? '';
      }
    }
    if (
      this._recordDeleteDetails.PK != '' &&
      this._recordDeleteDetails.ColumnName != ''
    ) {
      this._gridDelete = element[this._recordDeleteDetails.PK];
      this._gridDeleteColumn = element[this._recordDeleteDetails.ColumnName];
      this._recordDeleteDetails.Message =
        this._recordDeleteDetails.Message.replace(
          '{{0}}',
          this._gridDeleteColumn
        );
    }
    this.deleteFK[this._recordDeleteDetails.ParameterName] = this._gridDelete;
    this.matDeleteClickChange.emit(this._gridDelete);

    this._modalSettings.isModalVisible = true;
    this._modalSettings.headerMessage = 'Delete Confirmation';
    this._modalSettings.bodyMessage = this._recordDeleteDetails.Message;
    this._modalSettings.note = this._recordDeleteDetails.Note;
    this._modalSettings.parameter = this.deleteFK;
    this._modalSettings.api = this._recordDeleteDetails.API;
    this._modalSettings.html = targetElement;
    this.globalService.updateModelDeleteConfirmation(this._modalSettings);
  }
  onClicktoggle(element: any, event: Event) {
    const targetElement = event.target as HTMLElement;

    const actionColumn = this._tableSettings?.columns.find(
      (column) => column.data === 'Mat-Action'
    );
    if (
      actionColumn &&
      actionColumn.buttongroup &&
      actionColumn.buttongroup[0] &&
      actionColumn.buttongroup[0].toggle
    ) {
      if (targetElement.classList.contains('fa-toggle-off')) {
        // If it's off, toggle it to on
        targetElement.classList.remove('fa-toggle-off', 'text-danger');
        targetElement.classList.add('fa-toggle-on', 'text-success');
      } else if (targetElement.classList.contains('fa-toggle-on')) {
        // If it's on, toggle it to off
        targetElement.classList.remove('fa-toggle-on', 'text-success');
        targetElement.classList.add('fa-toggle-off', 'text-danger');
      }
      const parts = actionColumn.buttongroup[0].toggle[0].split('|');
      this._recordtoggleDetails.PK = parts[0] ?? '';
      this._recordtoggleDetails.API = parts[1] ?? '';
      this._recordtoggleDetails.ParameterName = parts[2] ?? '';
      this.toggleFK[this._recordtoggleDetails.ParameterName] =element[this._recordtoggleDetails.PK];
      this.CalltoggleAPI();
    }
  }
  //End Grid Button Click
  // Filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  //End Filter
  //CheckBox Control
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }

  getTotalCost(propertyName: string) {
    return this.datalist
      .map((t: { [x: string]: any }) => t[propertyName])
      .reduce((acc: any, value: any) => acc + (value || 0), 0); // Added || 0 to handle null/undefined
  }
  shouldShowButton(
    element: any,
    button: string,
    conditions: string[] | undefined
  ): boolean {
    if (!conditions || conditions.length === 0) {
      return true; // If no conditions are provided, always show the button
    }
    let hasbutton = conditions.some((condition) => condition.includes(button));
    if (hasbutton) {
      let condition = conditions.find((cond) => cond.startsWith(button));
      if (condition) {
        let parts = condition.split('|');
        if (parts.length === 3) {
          let column = parts[1];
          let value = parts[2];

          // Check if the element's specified column matches the value
          if (element[column] === value) {
            return true; // Show the button if the condition matches
          } else {
            return false;
          }
        }
      }
    } else {
      return true;
    }
    return true;
  }
  toggleCondition(element: any, button: string,conditions: string[]| undefined): boolean {
    if (!conditions || conditions.length === 0) {
      return true; // If no conditions are provided, always show the button
    }
    return conditions.some(condition => {
      const [type, columnName, expectedValue] = condition.split('|');
      if (type === button) {
        return element[columnName] === expectedValue;
      }
      return false;
    });
  }
  toggleTooltip(){
    const actionColumn = this._tableSettings?.columns.find(
      (column) => column.data === 'Mat-Action'
    );
    if (
      actionColumn &&
      actionColumn.buttongroup &&
      actionColumn.buttongroup[0] &&
      actionColumn.buttongroup[0].toggle
    ) {
      const parts = actionColumn.buttongroup[0].toggle[0].split('|');
      return parts[3] ?? 'Active / InActive'
    }
    return 'Active / InActive'
  }
  getTooltipContent(element: any): string {
    const entryBy = element.entredBy
      ? `Entry By: ${element.entredBy}`
      : 'Entry By: N/A';
    const entryDate = element.entrydate
      ? `Entry Date: ${this.globalService.formatDateTime(element.entrydate)}`
      : 'Entry Date: N/A';

    const modifiedBy = element.modifiedBy
      ? `Modified By: ${element.modifiedBy}`
      : 'Modified By: N/A';
    const modifiedDate = element.modifiedDate
      ? `Modified Date: ${this.globalService.formatDateTime(element.modifiedDate)}`
      : 'Modified Date: N/A';
    return `${entryBy}\n${entryDate}\n${modifiedBy}\n${modifiedDate}`;
  }
  CalltoggleAPI() {
    this.frameworkService
    .callSelectAPI(this._recordtoggleDetails.API, this.toggleFK, this.area,false)
    .subscribe({
      next: (Response) => {

      },
    });
  }
  onMatIconHistory(element: any, event: Event) {
    const targetElement = event.target as HTMLElement;
    const actionColumn = this._tableSettings?.columns.find(
      (column) => column.data === 'Mat-Action'
    );
    if (
      actionColumn &&
      actionColumn.buttongroup &&
      actionColumn.buttongroup[0] &&
      actionColumn.buttongroup[0].click &&
      actionColumn.buttongroup[0].click.some((x) => x.startsWith('history|'))
    ) {
      const historyAction = actionColumn.buttongroup[0].click.find((x) =>
        x.startsWith('history|')
      );
      if (historyAction) {
        const parts = historyAction.split('|');
         // Assign parts of the history action to recordHistoryDetails
         this._recordHistoryDetails.tableName = parts[1] ?? '';
         const PKname = parts[2] ?? '';

         // Check if the PKname exists in the element and assign it to fID
         if (PKname) {
           this._recordHistoryDetails.fID = element[PKname];
         }

         this._recordHistoryDetails.application = parts[3] ?? '';

         // Disable the loading of all records (default behavior)
         this._recordHistoryDetails.loadAllRecord = false;
      }
    this._historyrecordSettings.fID = this._recordHistoryDetails.fID;
    this._historyrecordSettings.tableName = this._recordHistoryDetails.tableName;
    this._historyrecordSettings.application = this._recordHistoryDetails.application;
    this._historyrecordSettings.html = targetElement;
    this.globalService.updateModelHistoryPopup(this._historyrecordSettings);
    }
  }
}
