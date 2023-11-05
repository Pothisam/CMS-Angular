import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/Global/Service/layout.service';
import { GlobalService } from 'src/app/Global/Service/global.service';
@Component({
  selector: 'app-cmslogin',
  templateUrl: './cmslogin.component.html',
  styleUrls: ['./cmslogin.component.scss']
})
export class CMSLoginComponent {

  /**
   *
   */
  constructor(private router: Router,private layout:LayoutService,private globalService:GlobalService) {
    this.layout.IsCMSNavVisible = false;
  }

 public onClick(){
  this.layout.IsCMSNavVisible = true;
  this.globalService.GLSS("Login","true")
  this.router.navigate(['CMS/Dashboard']);
  }
}
