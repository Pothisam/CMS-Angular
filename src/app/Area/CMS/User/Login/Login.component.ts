import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/Global/Service/layout.service';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { FormValidationService } from 'src/app/Shared/formValidation.service';
import { TextboxType } from 'src/app/Shared/Helper/helper-service.service';
import { LoginRequest } from 'src/app/Modules/CMS/User/Request/login.model';
@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  TextboxType = TextboxType;
  islo: string | null | undefined;
  LoginRequest: LoginRequest;
  constructor(
    private Location: Location,
    private router: Router,
    private layout: LayoutService,
    private globalService: GlobalService,
    private ValidationService: FormValidationService
  ) {
    this.LoginRequest = {
      userName: 'asds',
      password: '',
    };
  }

  ngOnInit() {
    this.layout.IsCMSNavVisible = false;
    if (this.Location.path().split('/')[1] == 'CMS') {
      this.islo = this.globalService.GLSG('Login');
      console.log(this.islo);
      if (this.islo == 'true') {
        this.router.navigate(['CMS/Dashboard']);
      }
    }
  }
  ngAfterViewInit(): void {}

  public onClick(event: MouseEvent) {
    const clickedElement = event.currentTarget as HTMLElement;
    let id = clickedElement.children[0].id;
    const value = this.ValidationService.getValue(this.LoginRequest, id);
    console.log(value)
    if (this.ValidationService.validate(event)) {
      console.log('true');
      console.log(this.LoginRequest);
    }

    //this.layout.IsCMSNavVisible = true;
    //this.globalService.GLSS("Login","true")
    //this.router.navigate(['CMS/Dashboard']);
  }
  ValidateForm(inputProperties: any): void {
    for (const property of inputProperties) {
      if (property.startsWith('entity')) {
        // Do something with each input property
        console.log(`${property}`);
      }
    }
  }
}
