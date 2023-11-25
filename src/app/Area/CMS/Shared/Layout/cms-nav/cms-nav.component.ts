import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cms-nav',
  templateUrl: './cms-nav.component.html',
  styleUrls: ['./cms-nav.component.scss']
})
export class CmsNavComponent {
  constructor(private router: Router){

  }
 public Logout(){
  localStorage.removeItem("Login");
  this.router.navigate(['CMS/Login']);
  }
}
