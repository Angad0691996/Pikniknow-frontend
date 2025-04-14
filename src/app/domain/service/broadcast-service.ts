import { Observable, Subject } from "rxjs";
import { Injectable, EventEmitter } from "@angular/core";
import { filter, map } from "rxjs/operators";

@Injectable()
export class BraodcastService {
  public sendDataSubject: Subject<any> = new Subject<any>();
  public sendDataSusciber: Observable<any>

  constructor() {
    this.sendDataSusciber = this.sendDataSubject.asObservable();
  }

  sendData(data: any): void {
    this.sendDataSubject.next(data);
  }
}
