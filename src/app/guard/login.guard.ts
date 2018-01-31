import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { GlobalService } from '../services/global/global.service';
import { Router } from "@angular/router";

@Injectable()
export class LoginGuard implements CanActivate {
  
  constructor(private globalService: GlobalService, private router: Router){
  }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {
    if(this.globalService.isUserLoggedIn == true){
      return true;
    }else{
      this.router.navigate(["home"]);
    }
  }
}
