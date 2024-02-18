import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/Global/Service/layout.service';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { FormValidationService } from 'src/app/Shared/formValidation.service';
import { ILoginRequest } from 'src/app/Modules/CMS/User/Request/login.model';
import { UserService } from 'src/app//Area/CMS/User/User.service';
@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  islo: string | null | undefined;
  private LoginRequest: ILoginRequest = {
    userName: '',
    password: '',
  };
  constructor(
    private Location: Location,
    private router: Router,
    private layout: LayoutService,
    private globalService: GlobalService,
    private ValidationService: FormValidationService,
    private userService: UserService
  ) {}

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
    if (this.ValidationService.validate(event)) {
      this.ValidationService.getValue(this.LoginRequest, event);
      console.log(this.LoginRequest);
      this.userService.userLogin(this.LoginRequest).subscribe({
        next: (Response) => {
          console.log(Response);
        },
      });
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
