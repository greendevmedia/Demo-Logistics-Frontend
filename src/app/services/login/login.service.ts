import { Injectable } from '@angular/core';
import { UrlService } from '../url/url.service';
import { GlobalService } from '../global/global.service';
import { RequestOptions, Headers, Response, Http } from "@angular/http";
import jwt_decode from "jwt-decode";
import { Router } from "@angular/router";
import { Location } from '@angular/common';

@Injectable()
export class LoginService {

  public userName: string = "";
  public password: string = "";
  public warning: boolean = true;
  public logoutUrl: string = this.urlService.keycloakUrl + "/realms/cvdemo/protocol/openid-connect/logout";
  public loginUrl: string = this.urlService.keycloakUrl + "/realms/cvdemo/protocol/openid-connect/token";

  constructor(private urlService: UrlService, private globalService: GlobalService, private http: Http, private router: Router) { }

  public loginProcedure() {
    let contentForLogin = this.createContentForLogin();
    this.login(contentForLogin);
  }

  public createContentForLogin(): string {
    this.globalService.userName = this.userName.toLowerCase();
    this.globalService.password = this.password;
    return `username=` + this.globalService.userName + '&password=' + this.globalService.password + '&client_id='
      + this.globalService.clientID + '&client_secret=' + this.globalService.clientSecret + '&grant_type=' + this.globalService.grantType;
  }

  public login(contentForLogin) {
    let headers = new Headers({ "Content-Type": "application/x-www-form-urlencoded" });
    let options = new RequestOptions({ headers: headers });
    this.http.post(this.loginUrl, encodeURI(contentForLogin), options).subscribe(
      (res) => {
        this.globalService.userAccessDataFromKeycloak = res.json(), this.globalService.isUserLoggedIn = true; this.checkWhichRole(this.globalService.userAccessDataFromKeycloak.access_token, this.globalService.role); this.warning = true;
      },
      (err) => {
        this.warning = false;
        this.globalService.isUserLoggedIn = false, this.router.navigate(["home"])
      })
  }


  public checkWhichRole(access_token, roles) {
    roles = null;
    var decoded = jwt_decode(access_token);
    roles = decoded.resource_access.Cvdemo.roles;
    roles = roles.sort((n1,n2)=> n2 > n1);
    for (let role of roles) {
      if (role == "manager") {
        this.globalService.role = role;
        this.router.navigate(["navpage"])
        break;
      } else if (role == "driver") {
        this.globalService.role = role;
        this.router.navigate(["driver-page"])
        break;
      } else if (role == "customer-one" && roles.length == 1) {
        this.globalService.role = role;
        this.router.navigate(["client-page"])
        break;
      } else if (role == "publican") {
        this.globalService.role = role;
        this.router.navigate(["publican-page"])
        break;
      }
      else if (role == "customer-all") {
        this.globalService.role = role;
        this.router.navigate(["client-page"])
        break;
      }
    }
  }

  public logout() {
    let contentForLogOut = 'refresh_token=' + this.globalService.userAccessDataFromKeycloak.refresh_token + '&client_id='
      + this.globalService.clientID + '&client_secret=' + this.globalService.clientSecret;
    let headers = new Headers({ "Content-Type": "application/x-www-form-urlencoded" });
    let options = new RequestOptions({ headers: headers });
    this.http.post(this.logoutUrl, contentForLogOut, options).subscribe(
      (res) => {
        this.globalService.isUserLoggedIn = false;
        this.router.navigateByUrl("/")
      },
      (err) => {
        console.log(err)
      })
  }
}


