import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GlobalService } from '../services/global/global.service';
import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginpageComponent implements OnInit{

  constructor(private globalService: GlobalService, private loginService: LoginService) {
  }
  
  ngOnInit() {
    this.globalService.isUserLoggedIn = false;
    this.globalService.userAccessDataFromKeycloak = null;
  }
  
}
