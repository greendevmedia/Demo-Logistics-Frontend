import { Injectable } from '@angular/core';

@Injectable()
export class UrlService {

  keycloakUrl: string = "https://42.ip-145-239-85.eu/auth"
  apiUrl: string = "https://testapilogistics.greendev.in/logistics-0.0.1-SNAPSHOT";

  constructor() { }

}
