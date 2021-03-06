import { Injectable } from '@angular/core';
import { HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GlobalService } from '../global/global.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private globalService: GlobalService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ` + this.globalService.userAccessDataFromKeycloak.access_token
      }
    });
    return next.handle(request);
  }

}
