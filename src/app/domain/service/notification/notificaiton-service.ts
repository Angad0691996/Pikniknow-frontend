import { Injectable } from "@angular/core";
declare var toastr: any;
@Injectable()
export class NotificationService {
  constructor() { }


 public success(text) {
    toastr.success(text)
  }
  public warning(text) {
    toastr.error(text)
  }
  public error(text) {
    toastr.error(text)
  }
}
