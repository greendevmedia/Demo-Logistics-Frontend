import { Injectable } from '@angular/core';
import { GlobalService } from '../global/global.service';
import { RequestOptions, Headers, Response, Http } from "@angular/http";
import { UrlService } from '../url/url.service';

@Injectable()
export class GetDriversService {

  public headers = new Headers({ "Authorization": "Bearer " + this.globalService.userAccessDataFromKeycloak.access_token });
  public options = new RequestOptions({ headers: this.headers });

  public driversList = [];
  public getDriversUrl = this.urlService.keycloakUrl + "/admin/realms/cvdemo/groups/7cbf3734-13e2-4910-800f-d320bde5637b/members"
  public customersList = [];
  public getCustomerUrl = this.urlService.keycloakUrl + "/admin/realms/cvdemo/groups/b12b0046-8f27-4a64-b119-82d4b5ca4152/members"

  constructor(private urlService: UrlService, private globalService: GlobalService, private http: Http) { }

  getDriversList() {
    this.http.get(this.getDriversUrl, this.options).subscribe(
      res => {
        this.JSONtoList(res.json(), this.driversList);
      },
      err => {
        console.log(err)
      }
    )
  }

  getCustomersList() {
    this.http.get(this.getCustomerUrl, this.options).subscribe(
      res => {
        this.JSONtoList(res.json(), this.customersList);
      },
      err => {
        console.log(err)
      }
    )
  }

  JSONtoList(JSONlist, list){
    if(list.length<1)
    for (let item of JSONlist){
      list.push(item.username);
    }
  }
  
}
