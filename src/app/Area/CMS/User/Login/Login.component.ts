import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/Global/Service/layout.service';
import { GlobalService } from 'src/app/Global/Service/global.service';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css'],
})
export class LoginComponent implements OnInit {

  islo:string | null | undefined;
  constructor(private Location:Location,private router: Router,private layout:LayoutService,private globalService:GlobalService) {


  }

  ngOnInit() {
    this.layout.IsCMSNavVisible = false;
    if(this.Location.path().split('/')[1] == "CMS"){
     this.islo = this.globalService.GLSG("Login");
     console.log(this.islo);
     if(this.islo == "true"){
     this.router.navigate(['CMS/Dashboard']);
     }
    }
  }
  public onClick(){
    this.layout.IsCMSNavVisible = true;
    this.globalService.GLSS("Login","true")
    this.router.navigate(['CMS/Dashboard']);
    }
}
