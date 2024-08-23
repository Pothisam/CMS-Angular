import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { FrameworkService } from 'src/app/Shared/framework/framework.service';
import { DOCUMENT } from '@angular/common';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { SelectInterface } from 'src/app/Global/Interface/common-interface';
import { ApiCallService } from 'src/app/Shared/apiCall.service';
@Component({
  selector: 'app-cms-nav',
  templateUrl: './cms-nav.component.html',
  styleUrls: ['./cms-nav.component.scss'],
})
export class CmsNavComponent {
  @ViewChild('IDLayoutSerach') input: ElementRef<HTMLInputElement> | undefined;
  userName: string | null | undefined;
  src: string = '';
  darkmode: boolean = false;
  searchText: string = '';
  public arrayDate: { value: string; text: string }[] = [];
  filter: SelectInterface[] = [
    {
      text: 'Dashboard',
      value: '/CMS/Dashboard',
    },
    {
      text: 'Institution',
      value: 'CMS/Institution',
    },
    {
      text: 'Department',
      value: 'CMS/Department',
    },
    {
      text: 'Course',
      value: 'CMS/Course',
    },
    {
      text: 'Section',
      value: 'CMS/Section',
    },
    {
      text: 'Batch',
      value: 'CMS/Batch',
    },
  ];
  constructor(
    private router: Router,
    private globalService: GlobalService,
    private frameworkService: FrameworkService,
    @Inject(DOCUMENT) private document: Document
  ) {
    if (this.globalService.GLSG('CMSToken') != null) {
      let userJSON = localStorage.getItem('CMSToken');
      if (userJSON !== null) {
        // Parse the JSON string to an object
        this.userName = JSON.parse(userJSON).userName;
        if (JSON.parse(userJSON).logoWithText == undefined) {
          this.loadLogo();
        } else {
          this.src = JSON.parse(userJSON).logoWithText;
          this.setFavicon(JSON.parse(userJSON).favIcon);
        }
      }
    }

    const theme = this.globalService.GLSG('Darktheme');
    this.darkmode =
      theme !== null && (theme.toLowerCase() === 'true' || theme === '1');

    const themeToApply = this.darkmode ? 'cyan-orange' : 'indigo-pink';
    this.globalService.switchTheme(themeToApply);
  }
  setFavicon(url: string): void {
    const link: HTMLLinkElement =
      this.document.querySelector('link[rel*="icon"]') ||
      this.document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = url;
    this.document.getElementsByTagName('head')[0].appendChild(link);
  }
  ngOnInit() {
    //this.loadLogo();
  }
  darkMode() {
    this.darkmode = !this.darkmode;
    if (this.darkmode) {
      this.globalService.switchTheme('cyan-orange');
    } else {
      this.globalService.switchTheme('indigo-pink');
    }
    this.globalService.GLSS('Darktheme', String(this.darkmode));
  }
  toggleDrawer(): void {
    this.globalService.menutoggle();
  }
  loadLogo() {
    let token = localStorage.getItem('CMSToken');

    this.frameworkService
      .callAPI('/Common/GetLogo', '', 'CMS', false)
      .subscribe({
        next: (Response) => {
          if (Response.data != null) {
            if (token) {
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
    ApiCallService.clearCache();
    localStorage.removeItem('CMSToken');
    this.router.navigate(['CMS/Login']);
  }
  onInputChange() {
    if (this.searchText.length > 0) {
      this.arrayDate = this.filter.filter((o) =>
        o.text.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }
  onSelectChange(event: MatAutocompleteSelectedEvent) {
    const strings = event.option.value;
    this.router.navigate([strings]);
    this.searchText = '';
    this.arrayDate = [];
  }
  refreshPage() {
    ApiCallService.clearCache();
    location.reload();
  }
}
