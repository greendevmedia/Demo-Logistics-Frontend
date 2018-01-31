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
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../services/login/login.service';


@Component({
  selector: 'app-list-shipments',
  templateUrl: './list-shipments.component.html',
  styleUrls: ['./list-shipments.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListShipmentsComponent implements OnInit {

  closeResult: string

  constructor(private http: Http, private globalService: GlobalService, private urlService: UrlService, private shipmentsService: ShipmentsService, private scanService: ScanService, private router: Router, private dateService: DateService, private modalService: NgbModal, private loginService: LoginService) { }


  ngOnInit() {
    this.shipmentsService.pagnitationView = false;
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
    this.router.navigate(["edit-shipments"]);
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
