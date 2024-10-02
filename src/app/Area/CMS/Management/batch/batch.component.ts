import { Component, OnInit } from '@angular/core';
import { ILoginRequest } from 'src/app/Modules/CMS/User/Request/login.model';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.css']
})
export class BatchComponent implements OnInit {

  constructor() { }
  public LoginRequest: ILoginRequest = {
    userName: '',
    password: '',
  };
  ngOnInit() {
  }

}
