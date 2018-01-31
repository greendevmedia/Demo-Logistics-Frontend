import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RequestOptions, Headers, Response, Http } from "@angular/http";
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ShipmentsService } from '../services/shipments/shipments.service';
import { DateService } from '../services/date/date.service';
import { GetDriversService } from '../services/drivers/get-drivers.service';
import { FileSelectDirective, FileDropDirective, FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload/ng2-file-upload';
import { GlobalService } from '../services/global/global.service';
import { UrlService } from '../services/url/url.service';
import { ScanService } from '../services/scans/scan.service';
import { Router } from "@angular/router";
import { LoginService } from '../services/login/login.service';


@Component({
  selector: 'app-edit-shipment',
  templateUrl: './edit-shipment.component.html',
  styleUrls: ['./edit-shipment.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditShipmentComponent implements OnInit {

  public headers = new Headers({ "Authorization": "Bearer " + this.globalService.userAccessDataFromKeycloak.access_token, "Content-Type": "application/json" });
  public options = new RequestOptions({ headers: this.headers });
  editShipmentForm;
  drivers;
  driverJSON = {};
  customers;
  customerJSON = {};
  uploader: FileUploader;
  urlScan = this.urlService.apiUrl + "/driver/api/v1/shipments/upload/";
  urlShipment = this.urlService.apiUrl + "/driver/api/v1/shipments/"
  links: string[]=[];
  information;
  statusOfEditing;
  dutyShipmentId;

  constructor(private shipmentService: ShipmentsService, private dateService: DateService, private getDriverService: GetDriversService, private globalService: GlobalService, private urlService: UrlService, private scanService: ScanService, private http: Http, private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    this.statusOfEditing = false;
    this.links = this.shipmentService.shipmentForEdit.scanLinks;
    this.drivers = this.shipmentService.shipmentForEdit.drivers;
    this.customers = this.shipmentService.shipmentForEdit.customers;
    this.dutyShipmentId = this.shipmentService.shipmentForEdit.dutyShipment.id;
    this.editShipmentForm = new FormGroup({
      id: new FormControl(this.shipmentService.shipmentForEdit.id),
      loadingDate: new FormControl(this.shipmentService.shipmentForEdit.loadingDate),
      unloadingDate: new FormControl(this.shipmentService.shipmentForEdit.unloadingDate),
      drivers: new FormControl(),
      documentNumber: new FormControl(this.shipmentService.shipmentForEdit.documentNumber),
      shipmentNumber: new FormControl(this.shipmentService.shipmentForEdit.shipmentNumber),
      salesOrder: new FormControl(this.shipmentService.shipmentForEdit.salesOrder),
      weightKg: new FormControl(this.shipmentService.shipmentForEdit.weightKg),
      capacityLtr: new FormControl(this.shipmentService.shipmentForEdit.capacityLtr),
      name: new FormControl(this.shipmentService.shipmentForEdit.name),
      place: new FormControl(this.shipmentService.shipmentForEdit.place),
      customers: new FormControl(),
      dutyShipment: new FormControl(this.dutyShipmentId),
      dutyShipmentNumber: new FormControl(this.shipmentService.shipmentForEdit.dutyShipmentNumber)
    })
    this.uploader = new FileUploader({ url: this.urlScan, authToken: "Bearer " + this.globalService.userAccessDataFromKeycloak.access_token });
    this.uploader.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
  }


  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    this.links.push(response);
  }

  onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    let error = JSON.parse(response);
  }

  addNextDriver() {
    if (this.editShipmentForm.value.drivers != null) {
      this.driverJSON = { id: Number(this.editShipmentForm.value.drivers) }
      this.drivers.push(this.driverJSON);
      this.editShipmentForm.controls['drivers'].setValue(
        null
      )
    }
  }
  deleteDriver(id) {
    if (this.drivers.length >= 0) {
      this.drivers.splice(id,1);
    }
  }

  addNextCustomer() {
    if (this.editShipmentForm.value.customers != null) {
      this.customerJSON = { id: Number(this.editShipmentForm.value.customers) }
      this.customers.push(this.customerJSON);
      this.editShipmentForm.controls['customers'].setValue(
        null
      )
    }
  }

  deleteCustomer(id) {
    if (this.customers.length >= 0) {
      this.customers.splice(id,1);
    }
  }

  deleteScanLink(id){
    if (this.links.length >= 0){
      this.links.splice(id,1);
    }
  }

  editShipment() {
    this.editShipmentForm.controls['drivers'].setValue(
      this.drivers
    )
    this.editShipmentForm.controls['customers'].setValue(
      this.customers
    )
    this.editShipmentForm.controls['dutyShipment'].setValue(
      {id: this.editShipmentForm.value.dutyShipment}
    )
    this.editShipmentForm.addControl("scanLinks", new FormControl(this.links));
    this.http.put(this.urlShipment, this.editShipmentForm.value, this.options).subscribe(
      (res) => {
        this.information = "Shipment edited with succes", this.statusOfEditing = true;
      },
      (err) => {
        console.log(err), this.information = "Shipment not edited, try again - probably ther is already Shipment Number that you choose";  this.editShipmentForm.controls['dutyShipment'].setValue(
         this.shipmentService.shipmentForEdit.dutyShipment.id)
      }
    )
  }

  goBack(){
    this.statusOfEditing = false;
    this.router.navigateByUrl("navpage")
  }


}
