import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { FrameworkService } from '../framework.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css'],
})
export class DownloadComponent implements OnInit {
  iconclass: string = 'fa-file-arrow-down';
  spinnerClass: string = 'fa-spinner fa-pulse';
  @Input() apiUrl: string = '';
  @Input() desc: string = 'No description available';
  @Input() icon: string = '';
  // #region parameter
  public _parameter: any;
  get parameter() {
    return this._parameter;
  }
  @Input()
  set parameter(value: any) {
    if (this._parameter === value) {
      return;
    }
    this._parameter = value;
    this.parameterChange.emit(this._parameter);
  }
  @Output()
  parameterChange = new EventEmitter<any>();
  // #endregion
  private renderer: Renderer2;
  constructor(
    private el: ElementRef,
    private rendererFactory: RendererFactory2,
    private globalService: GlobalService,
    private frameworkService: FrameworkService
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }
  area: string = this.globalService.getArea();
  ngOnInit() {
    this.changeicon();
    this.addClickEventListener();
  }
  changeicon() {
    if (this.icon == 'doc') {
      this.iconclass = 'fa-file-word';
    } else if (this.icon == 'pdf') {
      this.iconclass = 'fa-file-pdf';
    } else if (this.icon == 'excel') {
      this.iconclass = 'fa-file-excel';
    } else {
      this.iconclass = 'fa-file-arrow-down';
    }
  }
  addClickEventListener() {
    const element = this.el.nativeElement.querySelector('.fw-download-icon');
    if (element) {
      this.renderer.listen(element, 'click', (event: MouseEvent) => {
        this.iconclass = this.spinnerClass;
        this.calldownloadAPI();
      });
    }
  }
  calldownloadAPI() {
    if (this.apiUrl != '') {
      this.frameworkService
        .calldownloadAPI(this.apiUrl, this._parameter, this.area)
        .subscribe({
          next: (Response) => {
            if (Response != null) {
              this.changeicon();
            }
          },
        });
    }
  }
}
