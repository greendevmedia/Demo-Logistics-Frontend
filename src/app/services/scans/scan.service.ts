import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Response, Http } from "@angular/http";
import { GlobalService } from '../global/global.service';
import { UrlService } from '../url/url.service';
import { saveAs as importedSaveAs } from "file-saver";
import { Observable } from 'rxjs/Observable';
import { ResponseContentType } from '@angular/http';

@Injectable()
export class ScanService {

  constructor(private http: Http, private globalService: GlobalService, private urlService: UrlService) { }

  public ngOnInit() {
  }

  public downloadFile(name): Observable<Blob> {
    let headers = new Headers({ "Authorization": "Bearer " + this.globalService.userAccessDataFromKeycloak.access_token });
    let options = new RequestOptions({ headers: headers, responseType: ResponseContentType.Blob });
    return this.http.get(this.urlService.apiUrl + "/customer-one/api/v1/shipments/download/" + name, options).map(res => res.blob())
  }

  public downloadFileService(name) {
    this.downloadFile(name).subscribe(blob => {
      importedSaveAs(blob, name);
    })
  }

  public downloadFileForDriver(name): Observable<Blob> {
    let headers = new Headers({ "Authorization": "Bearer " + this.globalService.userAccessDataFromKeycloak.access_token });
    let options = new RequestOptions({ headers: headers, responseType: ResponseContentType.Blob });
    return this.http.get(this.urlService.apiUrl + "/driver/api/v1/shipments/download/" + name, options).map(res => res.blob())
  }

  public downloadFileServiceForDriver(name) {
    this.downloadFileForDriver(name).subscribe(blob => {
      importedSaveAs(blob, name);
    })
  }

}
