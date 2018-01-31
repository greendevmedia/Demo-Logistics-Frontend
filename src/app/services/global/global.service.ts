import { Injectable } from '@angular/core';
import { Response } from '@angular/http/src/static_response';

@Injectable()
export class GlobalService {

  public userName;
  public password;
  public userAccessDataFromKeycloak;
  public isUserLoggedIn: boolean = false;
  public grantType: string;

  public clientID: string;
  public clientSecret: string; 
  public role;

  constructor() { }

}
