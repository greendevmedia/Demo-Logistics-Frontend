import { Component, OnInit, ViewEncapsulation} from '@angular/core';
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
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ClientPageComponent implements OnInit {
  constructor(private http: Http, private globalService: GlobalService, private urlService: UrlService, private shipmentsService: ShipmentsService, private scanService: ScanService, private router: Router, private dateService: DateService, private loginService: LoginService) { }

  ngOnInit() {
    this.shipmentsService.pagnitationView = false;
    this.shipmentsService.wrongStatusOfShipmentById = true;
    this.shipmentsService.shipmentsList = [];
    this.shipmentsService.page = 1;
    this.shipmentsService.shipmentNumber = null;
  }

}
