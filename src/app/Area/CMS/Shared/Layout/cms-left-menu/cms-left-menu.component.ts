import { Component } from '@angular/core';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { IMenuItem } from 'src/app/Global/Interface/common-interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cms-left-menu',
  templateUrl: './cms-left-menu.component.html',
  styleUrls: ['./cms-left-menu.component.scss'],
})

export class CmsLeftMenuComponent {
  src: string = '';
  panelOpenState = false;
  constructor(private globalService: GlobalService,private router: Router) {}
  private retryCount = 0;
  ngOnInit() {
    this.setMenuLogo();
  }
  closeMenu() {
    this.globalService.menutoggle();
  }
  public  menu: IMenuItem[] = [
    { name: "Dashboard", link: "CMS/Dashboard" },
    {
      name: "Management",
      subMenu: [
        { name: "General Information", link: "CMS/Institution" },
        { name: "Department", link: "#department" },
        { name: "Course", link: "#course" },
        { name: "Section", link: "#section" },
        { name: "Batch", link: "#batch" },
        { name: "Holiday-Workingday", link: "#holiday-workingday" },
      ],
    },
    {
      name: "Staff",
      subMenu: [
        { name: "Add Staff", link: "#addstaff" },
        { name: "View Staff", link: "#viewstaff" },
      ],
    },
    // ... other menu items
  ];
  handleKeydown(event: KeyboardEvent, link?: string): void {
    // Check if the 'Enter' key was pressed
    if (event.key === 'Enter') {
      // Use the Router to navigate to the link
      this.router.navigate([link]);
    }
  }
  private setMenuLogo() {
    if (this.globalService.GLSG('CMSToken') != null) {
      let userJSON = localStorage.getItem('CMSToken');
      if (userJSON !== null) {
        if (JSON.parse(userJSON).logoWithText == undefined) {
          if (this.retryCount < 3) {
            setTimeout(() => {
              this.retryCount++;
              this.setMenuLogo(); // Retry the operation
            }, 3000);
          }
        } else {
          this.src = JSON.parse(userJSON).logoWithText;
        }
      }
    }
  }
}
