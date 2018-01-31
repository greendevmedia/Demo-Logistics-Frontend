import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RequestOptions, Headers, Response, Http } from "@angular/http";
import { GlobalService } from '../services/global/global.service';
import { UrlService } from '../services/url/url.service';
import { saveAs as importedSaveAs } from "file-saver";
import { Observable } from 'rxjs/Observable';
import { ResponseContentType } from '@angular/http';
import 'rxjs/Rx';
import { ShipmentsService } from '../services/shipments/shipments.service';
import { ScanService } from '../services/scans/scan.service';
import { Router } from "@angular/router";
import { DateService } from '../services/date/date.service';
import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'app-driver-page',
  templateUrl: './driver-page.component.html',
  styleUrls: ['./driver-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DriverPageComponent implements OnInit {

  constructor(private http: Http, private globalService: GlobalService, private urlService: UrlService, private shipmentsService: ShipmentsService, private scanService: ScanService, private router: Router, private dateService: DateService, private loginService: LoginService) { }


  ngOnInit() {
    this.shipmentsService.wrongStatusOfShipmentById = true;
    this.shipmentsService.shipmentsList = [];
    this.shipmentsService.page = 1;
    this.shipmentsService.shipmentNumber = null;
  }

  logout() {
    this.router.navigateByUrl("/")
  }

  goToEdit(id) {
    this.shipmentsService.shipmentForEdit = this.shipmentsService.shipmentsList[id];
    this.shipmentsService.shipmentForEdit.loadingDate = this.dateService.dateFormatForPost(this.shipmentsService.shipmentsList[id].loadingDate);
    this.shipmentsService.shipmentForEdit.unloadingDate = this.dateService.dateFormatForPost(this.shipmentsService.shipmentsList[id].unloadingDate);
    this.router.navigate(["edit-shipment-driver"]);
  }

}
