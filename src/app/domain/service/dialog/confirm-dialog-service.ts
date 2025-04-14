import { Injectable } from '@angular/core';  
import { Router, NavigationStart } from '@angular/router';  
import { Observable, Subject} from 'rxjs';  
@Injectable()
export class ConfirmDialogService {  
    private subject = new Subject<any>();  
    constructor() { }  
  confirmThis(message: string, siFn: () => void, noFn: () => void) {
      debugger
        this.setConfirmation(message, siFn, noFn);  
    }  
    setConfirmation(message: string, siFn: () => void, noFn: () => void) {  
        let that = this;  
        this.subject.next({  
            type: "confirm",  
            text: message,  
            siFn:  
              function () {
                  debugger
                    that.subject.next(); //this will close the modal  
                    siFn();  
                },  
            noFn: function () {  
debugger
              that.subject.next();  
                noFn();  
            }  
        });  
  
    }  
  
  getMessage(): Observable<any> {
      debugger
        return this.subject.asObservable();  
    }  
}  
