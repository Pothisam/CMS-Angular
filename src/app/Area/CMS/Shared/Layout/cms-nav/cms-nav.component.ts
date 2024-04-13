import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { HelperService } from 'src/app/Shared/Helper/helper-service.service';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-cms-nav',
  templateUrl: './cms-nav.component.html',
  styleUrls: ['./cms-nav.component.scss'],
})
export class CmsNavComponent {
  userName: string | null | undefined;
  src: string = '';
  darkmode:boolean =false;
  constructor(
    private router: Router,
    private globalService: GlobalService,
    private helperService: HelperService,@Inject(DOCUMENT) private document: Document
  ) {
    if (this.globalService.GLSG('CMSToken') != null) {
      let userJSON = localStorage.getItem('CMSToken');
      if (userJSON !== null) {
        // Parse the JSON string to an object
        this.userName = JSON.parse(userJSON).userName;
        if (JSON.parse(userJSON).logoWithText == undefined) {
          this.loadLogo();
        }
        else{
          this.src =JSON.parse(userJSON).logoWithText;
          this.setFavicon(JSON.parse(userJSON).favIcon);
        }
      }
    }
  }
  setFavicon(url: string): void {
    const link: HTMLLinkElement = this.document.querySelector('link[rel*="icon"]') || this.document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = url;
    this.document.getElementsByTagName('head')[0].appendChild(link);
  }
  ngOnInit() {
    //this.loadLogo();
  }
  darkMode(){
    this.darkmode = !this.darkmode;
    if(this.darkmode){
      this.globalService.switchTheme("cyan-orange")
    }
    else{
      this.globalService.switchTheme("indigo-pink")
    }
  }
  toggleDrawer(): void {
    this.globalService.menutoggle();
  }
  loadLogo() {
    let token = localStorage.getItem('CMSToken');

    this.helperService.callAPI('/Common/GetLogo', '', 'CMS').subscribe({
      next: (Response) => {
        if (Response.data != null) {
          if(token){
            let object = JSON.parse(token);
            object.logoWithText = Response.data.logoWithText;
            object.logo = Response.data.logo;
            object.favIcon = Response.data.favIcon;
            let updatedobject = JSON.stringify(object);
            localStorage.setItem('CMSToken', updatedobject);
            this.src = Response.data.logoWithText;
            this.setFavicon(Response.data.favIcon);
          }
        }
      },
    });
  }
  public Logout() {
    localStorage.removeItem('CMSToken');
    this.router.navigate(['CMS/Login']);
  }
}
