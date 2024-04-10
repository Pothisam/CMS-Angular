import { Component } from '@angular/core';
import { GlobalService } from 'src/app/Global/Service/global.service';

@Component({
  selector: 'app-cms-left-menu',
  templateUrl: './cms-left-menu.component.html',
  styleUrls: ['./cms-left-menu.component.scss']
})
export class CmsLeftMenuComponent {
  src: string = '';
  panelOpenState = false;
  constructor(
    private globalService: GlobalService
  ) {
    if (this.globalService.GLSG('CMSToken') != null) {
      let userJSON = localStorage.getItem('CMSToken');
      if (userJSON !== null) {
        if (JSON.parse(userJSON).logoWithText == undefined) {

        }
        else{
          this.src =JSON.parse(userJSON).logoWithText;
        }
      }
    }
  }
}
