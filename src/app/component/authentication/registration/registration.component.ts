import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { RxHttp } from '@rxweb/http';
import { RxFormBuilder, RxFormGroup, RxwebValidators } from '@rxweb/reactive-form-validators';
import { Subscription } from 'rxjs';
import { UserBase } from 'src/app/database-model/user-base';
import { Status, Role } from 'src/app/domain/enum/enums';
import { NotificationService } from 'src/app/domain/service/notification/notificaiton-service';
import { Router } from '@angular/router';
import { FRONT_URL, BACkEND_URL } from 'src/app/domain/constant/constants';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
})
export class RegistrationComponent implements OnInit,OnDestroy {
    

  subscription: Subscription;
  showComponent: boolean = false;
  registrationFormGroup: RxFormGroup;
  user: UserBase;
  lookups: any;
  labelComapny: string = "";
  labelFunctionId: string;
  pharmaCompanis: any = [];
  constructor(private rxHttp: RxHttp,
    private rxFormBuilder: RxFormBuilder,
    private router: Router, 
    private notificationService: NotificationService
  ) {
    this.rxHttp.badRequest = (errorMessage: any) => {
      let data = document.getElementById("loader");
      data.classList.remove("loading")
      let response = JSON.parse(errorMessage)
      this.notificationService.error(response.message);
    }
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
