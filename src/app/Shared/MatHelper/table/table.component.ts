import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IDatatable } from 'src/app/Modules/CMS/User/Request/login.model';
export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}
export interface TableColumn {
  name: string;
  apiName: string;
}
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>([]);
 public TableColum: TableColumn[]=[];
 private _parameter: IDatatable | undefined;

 @Input()
 set parameter(value: IDatatable | undefined) {
   if (this._parameter !== value) {
     this._parameter = value;
     this.prepareTable();
     this.parameterChange.emit(this._parameter);
   }
 }
 get parameter(): IDatatable | undefined {
   return this._parameter;
 }

 @Output() parameterChange = new EventEmitter<IDatatable | undefined>();
 @Input()
  set jsonData(v: any[]) {
    if (this._parameter) {
      this._parameter.jsonData = v;
    }
    this.prepareTable();
  }
  public tableColumnsName: string[] = [];
  public displayedColumns: string[] = [];
  constructor() {

  }
  ngOnInit() {

  }
  ngAfterViewInit() {
    this.prepareTable();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  prepareTable(){
    this.TableColum = this._parameter!.tableColumnsName.map((name, index) => ({
      name,
      apiName: this._parameter!.apiColumnsName[index]
    }));
    this.displayedColumns =this._parameter?.apiColumnsName || [];
    if (this._parameter) {
      this.dataSource.data = this._parameter.jsonData;
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
