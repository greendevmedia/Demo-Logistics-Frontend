import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { RequestOptions, Headers, Response, Http } from "@angular/http";
import { GlobalService } from '../services/global/global.service';
import { Router } from "@angular/router";
import { FileSelectDirective, FileDropDirective, FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload/ng2-file-upload';
import { UrlService } from '../services/url/url.service';
import { GetDriversService } from '../services/drivers/get-drivers.service';
import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'app-add-shipments',
  templateUrl: './add-shipments.component.html',
  styleUrls: ['./add-shipments.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddShipmentsComponent implements OnInit {

  links: string[] = [];
  shipmentForm: FormGroup;
  information: string;
  uploader: FileUploader;
  driverJSON = {};
  drivers = [];
  customerJSON = {};
  customers = [];
  statusOfAdding = false;
  
  constructor(private http: Http, private globalService: GlobalService, private router: Router, private urlService: UrlService, private getDriverService: GetDriversService, private loginService: LoginService) { }
  
  ngOnInit() {
    this.drivers = [];
    this.customers = [];
    this.getDriverService.getDriversList();
    this.getDriverService.getCustomersList();
    this.statusOfAdding = false;
    this.information = null;
    this.shipmentForm = new FormGroup({
      loadingDate: new FormControl(''),
      unloadingDate: new FormControl(''),
      drivers: new FormControl(),
      documentNumber: new FormControl(''),
      shipmentNumber: new FormControl(''),
      salesOrder: new FormControl(''),
      weightKg: new FormControl(''),
      capacityLtr: new FormControl(),
      name: new FormControl(''),
      place: new FormControl(''),
      customers: new FormControl(),
      dutyShipment: new FormControl(1),
      dutyShipmentNumber: new FormControl('')
    })
    
    this.uploader = new FileUploader({ url: this.urlService.apiUrl + "/driver/api/v1/shipments/upload", authToken: "Bearer " + this.globalService.userAccessDataFromKeycloak.access_token });
    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
    this.uploader.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
  }

  addNextDriver() {
    if (this.shipmentForm.value.drivers != null) {
      this.driverJSON = { id: Number(this.shipmentForm.value.drivers) }
      this.drivers.push(this.driverJSON);
      this.shipmentForm.controls['drivers'].setValue(
        null
      )
    }
  }

  deleteDriver(id) {
    if (this.drivers.length >= 0) {
      this.drivers.splice(id, 1);
    }
  }

  addNextCustomer() {
    if (this.shipmentForm.value.customers != null) {
      this.customerJSON = { id: Number(this.shipmentForm.value.customers) }
      this.customers.push(this.customerJSON);
      this.shipmentForm.controls['customers'].setValue(
        null
      )
    }
  }

  deleteCustomer(id) {
    if (this.customers.length >= 0) {
      this.customers.splice(id, 1);
    }
  }

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    this.links.push(response);
  }

  onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    let error = JSON.parse(response);
  }

  saveShipment() {
  let headers = new Headers({ "Authorization": "Bearer " + this.globalService.userAccessDataFromKeycloak.access_token, "Content-Type": "application/json" });
  let options = new RequestOptions({ headers: headers }); 
    this.shipmentForm.controls['drivers'].setValue(
      this.drivers
    )
    this.shipmentForm.controls['customers'].setValue(
      this.customers
    )
    this.shipmentForm.controls['dutyShipment'].setValue(
      { id: this.shipmentForm.value.dutyShipment }
    )
    this.shipmentForm.addControl("scanLinks", new FormControl(this.links));
    this.http.post(this.urlService.apiUrl + "/driver/api/v1/shipments/", this.shipmentForm.value, options).subscribe(
      (res) => {this.information = "Shipment added", this.statusOfAdding = true;},
      (err) => {this.information = "Shipment not save, try again - probably ther is already Shipment Number that you choose"; this.shipmentForm.controls['dutyShipment'].setValue(1)
      }
    )
  }

}
