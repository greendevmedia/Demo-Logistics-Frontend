import { Injectable } from '@angular/core';

@Injectable()
export class DateService {

  constructor() { }

  public datechecker(dateValue) {
    if (dateValue < 10) {
      dateValue = "0" + dateValue;
    }
    return dateValue;
  }

  public dateFormatForPost(date) {
    if (date == null) {
      return [];
    } else {
      return date[0] + "-" + this.datechecker(date[1]) + "-" + this.datechecker(date[2]);
    }
  }

}
