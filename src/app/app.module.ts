import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app/app.component';
import { HttpModule } from '@angular/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NavpageComponent } from './navpage/navpage.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { GlobalService } from './services/global/global.service';
import { CanActivate } from '@angular/router';
import { LoginGuard } from './guard/login.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UrlService } from './services/url/url.service';
import { ListShipmentsComponent } from './list-shipments/list-shipments.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ClientPageComponent } from './client-page/client-page.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token - interceptro/token-interceptor.service';
import { AddShipmentsComponent } from './add-shipments/add-shipments.component';
import { GetDriversService } from './services/drivers/get-drivers.service';
import { ShipmentsService } from './services/shipments/shipments.service';
import { ScanService } from './services/scans/scan.service';
import { LoginService } from './services/login/login.service';
import { DateService } from './services/date/date.service';
import { EditShipmentComponent } from './edit-shipment/edit-shipment.component';
import { DriverPageComponent } from './driver-page/driver-page.component';
import { EditShipmentDriverComponent } from './edit-shipment-driver/edit-shipment-driver.component';




const appRoutes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'navpage', component: NavpageComponent, canActivate: [LoginGuard] },
  { path: 'list-shipments', component: ListShipmentsComponent, canActivate: [LoginGuard] },
  { path: 'add-shipments', component: AddShipmentsComponent, canActivate: [LoginGuard] },
  { path: 'edit-shipments', component: EditShipmentComponent, canActivate: [LoginGuard] },
  { path: 'client-page', component: ClientPageComponent, canActivate: [LoginGuard] },
  { path: 'driver-page', component: DriverPageComponent, canActivate: [LoginGuard] },
  { path: 'edit-shipment-driver', component: EditShipmentDriverComponent, canActivate: [LoginGuard] },
  { path: '', component: LoginpageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavpageComponent,
    LoginpageComponent,
    ListShipmentsComponent,
    ClientPageComponent,
    AddShipmentsComponent,
    EditShipmentComponent,
    DriverPageComponent,
    EditShipmentDriverComponent
  ],
  imports: [
    FileUploadModule,
    BrowserModule,
    HttpModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes),
    NgbModule.forRoot()
  ],
  providers: [GlobalService, LoginGuard, UrlService, GetDriversService, ShipmentsService, ScanService, LoginService, DateService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
