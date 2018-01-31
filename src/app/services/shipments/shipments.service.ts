import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Response, Http } from "@angular/http";
import { GlobalService } from '../global/global.service';
import { UrlService } from '../url/url.service';

@Injectable()
export class ShipmentsService {

  public page = 1;
  public shipmentsList = [];
  public shipmentId;
  public collectionSize;
  public shipmentNumber;
  public wrongStatusOfShipmentById = true;
  public wrongStatusOfShipmentByWord = true;
  public shipmentForEdit;
  public pagnitationView = false;
  public maxSize;
  public pageSize;
  public searchWord = "";
  constructor(private http: Http, private globalService: GlobalService, private urlService: UrlService) { }

  public deleteShipmentById(id) {
    let headers = new Headers({ "Authorization": "Bearer " + this.globalService.userAccessDataFromKeycloak.access_token });
    let options = new RequestOptions({ headers: headers });
    let urlShipmentForManager = this.urlService.apiUrl + "/driver/api/v1/shipments/";
    this.http.delete(urlShipmentForManager + id, options).subscribe(
      (res) => {
        this.getShipments(30, 0);
      },
      (err) => {
        console.log(err)
      }
    )
  }

  public getShipments(size, page) {
    if (page == 0) { page = 0; this.page = 1; } else { page = page - 1 }
    let headers = new Headers({ "Authorization": "Bearer " + this.globalService.userAccessDataFromKeycloak.access_token });
    let options = new RequestOptions({ headers: headers });
    let urlShipmentsForManager = this.urlService.apiUrl + "/driver/api/v1/shipments/shipments-limit?page=";
    this.http.get(urlShipmentsForManager + page + "&size=" + size + "", options).subscribe(
      (res) => {
        this.shipmentsList = []; this.shipmentsList = res.json().content; this.collectionSize = res.json().totalElements; this.pagnitationView = true; this.maxSize = res.json().totalPages; this.pageSize = res.json().size;
      },
      (err) => {
        console.log(err)
      }
    )
  }

  public getShipmentByShipmentNumber(shipmentNumber) {
    let headers = new Headers({ "Authorization": "Bearer " + this.globalService.userAccessDataFromKeycloak.access_token });
    let options = new RequestOptions({ headers: headers });
    let urlByShipmentNumber = this.urlService.apiUrl + "/driver/api/v1/shipments/ship/"
    this.http.get(urlByShipmentNumber + shipmentNumber, options).subscribe(
      (res) => {
        this.shipmentsList = res.json(); this.wrongStatusOfShipmentById = true; this.pagnitationView = false;
      },
      (err) => {
        this.wrongStatusOfShipmentById = false;
      }
    )
  }

  public getShipmentByWordSearch(searchWord) {
    let headers = new Headers({ "Authorization": "Bearer " + this.globalService.userAccessDataFromKeycloak.access_token });
    let options = new RequestOptions({ headers: headers });
    let urlBySearchWord = this.urlService.apiUrl + "/driver/api/v1/shipments/search/";
    this.http.get(urlBySearchWord + searchWord, options).subscribe(
      (res) => {
        this.shipmentsList = res.json(); this.wrongStatusOfShipmentByWord = true; this.pagnitationView = false;
      },
      (err) => {
        this.wrongStatusOfShipmentByWord = false;
      }
    )
  }


  public getShipmentByShipmentNumberAndByCustomer(shipmentNumber) {
    let headers = new Headers({ "Authorization": "Bearer " + this.globalService.userAccessDataFromKeycloak.access_token });
    let options = new RequestOptions({ headers: headers });
    let urlByShimpentNumberAndCustomer = this.urlService.apiUrl + "/customer-one/api/v1/shipments/" + encodeURI(this.globalService.userName) + "/"
    this.http.get(urlByShimpentNumberAndCustomer + shipmentNumber, options).subscribe(
      (res) => {
        this.shipmentsList = []; this.shipmentsList = res.json(); this.wrongStatusOfShipmentById = true; this.pagnitationView = false;
      },
      (err) => {
        console.log(err), this.wrongStatusOfShipmentById = false;
      }
    )
  }

  public getShipmentsByCustomer(size, page) {
    if (page == 0) { page = 0; this.page = 1; } else { page = page - 1 }
    let urlShipments: string = this.urlService.apiUrl + "/customer-all/api/v1/shipments/" + encodeURI(this.globalService.userName) + "/" + "shipments-limit?page=";
    let headers = new Headers({ "Authorization": "Bearer " + this.globalService.userAccessDataFromKeycloak.access_token });
    let options = new RequestOptions({ headers: headers });
    this.http.get(urlShipments + page + "&size=" + size + "", options).subscribe(
      (res) => {
        this.shipmentsList = res.json().content; this.collectionSize = res.json().totalElements; this.pagnitationView = true; this.maxSize = res.json().totalPages; this.pageSize = res.json().size;
      },
      (err) => {
        console.log(err)
      }
    )
  }




}
