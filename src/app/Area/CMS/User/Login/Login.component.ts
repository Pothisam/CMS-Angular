import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/Global/Service/layout.service';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { FormValidationService } from 'src/app/Shared/formValidation.service';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css'],
})
export class LoginComponent implements OnInit {

  islo:string | null | undefined;
  constructor(
      private Location:Location,
      private router: Router,
      private layout:LayoutService,
      private globalService:GlobalService,
      private FormValidationService: FormValidationService
    ) {
    username:String;

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
  public onClick(event: MouseEvent){
    const {response, errors} = this.FormValidationService.validateForm("login-btn");
    console.log("This is response", response);
    console.log("This is errors", errors);
    //this.layout.IsCMSNavVisible = true;
    //this.globalService.GLSS("Login","true")
    //this.router.navigate(['CMS/Dashboard']);
    const clickedElement = event.currentTarget as HTMLElement;
    if (clickedElement.children[0].id) {
      const buttonId = clickedElement.children[0].id;
      //this.globalService.disableButton(buttonId);
      this.ValidateForm(Object.keys(this));
    }
    }
    ValidateForm(inputProperties:any): void{
      for (const property of inputProperties) {
        if (property.startsWith('entity')) {
          // Do something with each input property
          console.log(`${property}`);
        }
      }
    }


}
