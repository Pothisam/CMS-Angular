import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/Global/Service/global.service';
@Component({
  selector: 'app-cms-nav',
  templateUrl: './cms-nav.component.html',
  styleUrls: ['./cms-nav.component.scss'],
})
export class CmsNavComponent {
  userName:string | null | undefined;
  constructor(private router: Router,private globalService: GlobalService,) {
    if(this.globalService.GLSG("CMSToken") != null){
    let userJSON = localStorage.getItem('CMSToken');
    if (userJSON !== null) {
    // Parse the JSON string to an object
    this.userName = JSON.parse(userJSON).userName;
    }
    }
  }
  public Logout() {
    localStorage.removeItem('CMSToken');
    this.router.navigate(['CMS/Login']);
  }
}
