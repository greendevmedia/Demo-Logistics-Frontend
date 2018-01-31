import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ShipmentsService } from '../services/shipments/shipments.service';
@Component({
  selector: 'app-navpage',
  templateUrl: './navpage.component.html',
  styleUrls: ['./navpage.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavpageComponent implements OnInit {

  constructor(private shipmentService: ShipmentsService) { }
  ngOnInit() {  

  }
}








