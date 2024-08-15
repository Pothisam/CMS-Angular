import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { IModalSettings } from './model';
import { FrameworkService } from '../framework.service';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css'],
})
export class ModelComponent implements OnInit {
  isModalVisible = true;
  _modalSettings: IModalSettings = new IModalSettings();
  area: string = this.globalService.getArea();
  @ViewChild('staticBackdrop') modalElement!: ElementRef;
  constructor(private globalService: GlobalService,private frameworkService: FrameworkService) {}

  ngOnInit() {
    this.globalService.modelDeleteConfirmation$.subscribe(
      (value: IModalSettings) => {
        this._modalSettings = value;
        setTimeout(() => {
          if (this.modalElement) {
            this.modalElement.nativeElement.focus();
          }
        }, 0);
      }
    );
  }
  openModal() {
    this._modalSettings.isModalVisible = true;
    if (this.modalElement) {
      this.modalElement.nativeElement.focus();
    }
  }

  closeModal() {
    if(this._modalSettings.html != null){
      this._modalSettings.html.focus();
    }
    this._modalSettings.isModalVisible = false;
  }
  CallAPI() {
    this.frameworkService
    .callSelectAPI(this._modalSettings.api, this._modalSettings.parameter, this.area,false)
    .subscribe({
      next: (Response) => {
        if(Response.status == '200'){
          this.closeModal();
          if(this._modalSettings.html != null){
            this._modalSettings.html.remove();
          }
        }


      },
    });
  }
}
