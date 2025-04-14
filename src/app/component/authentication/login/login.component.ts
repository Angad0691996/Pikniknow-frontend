import { Component, OnInit, OnDestroy } from '@angular/core';
import { BraodcastService } from 'src/app/domain/service/broadcast-service';
import { StorageService } from 'src/app/domain/service/storage-service';
import { IS_LOGIN, TOKEN, LOGIN_USER } from 'src/app/domain/constant/constants';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { RxHttp } from '@rxweb/http';
import { RxFormBuilder, RxFormGroup } from '@rxweb/reactive-form-validators';
import { UserCredentialViewModel } from 'src/app/view-model/user-credentail-view-model';
import { NotificationService } from 'src/app/domain/service/notification/notificaiton-service';
import { APIResponseViewModel } from 'src/app/view-model/api-response-view-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {


  subscription: Subscription;
  isForGotPassword = false;
  showComponent: boolean = false;
  loginFormGroup: RxFormGroup;
  userCredentialViewModel: UserCredentialViewModel;
  postLogin: boolean = false;
  fieldTextType! :boolean;

  constructor(private rxHttp: RxHttp,
    private rxFormBuilder: RxFormBuilder,
    private braodcastService: BraodcastService,
    private storageService: StorageService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    if (this.storageService.isLogin) {
     // window.location.href = "/dashboard";
    }
    this.rxHttp.badRequest = (errorMessage: any) => {
      let data = document.getElementById("loader");
      data.classList.remove("loading")
      let response = JSON.parse(errorMessage)
      this.notificationService.error(response.message);
    }
  }

  ngOnInit() {
    this.userCredentialViewModel = new UserCredentialViewModel();
    this.loginFormGroup = <RxFormGroup>this.rxFormBuilder.formGroup(UserCredentialViewModel, this.userCredentialViewModel)
    this.showComponent = true;
  }
  toggleFieldTextType(){
    this.fieldTextType= !this.fieldTextType;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  login() {
    this.loginFormGroup.submitted = true;
    if (this.loginFormGroup.valid) {
      this.subscription = this.rxHttp.post({ body: this.loginFormGroup.value, path: "UserAuthentication/login" }).subscribe((data: any) => {
        this.notificationService.success("Login Successfully");
        this.storageService.set(IS_LOGIN, true);
        this.storageService.set(TOKEN, data.response.token);
        this.storageService.set(LOGIN_USER, data.response);
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
      })
    }
  }

  activeForgotPassword() {
    this.isForGotPassword = !this.isForGotPassword;
  }

  sendVerificationLink() {
    this.loginFormGroup.submitted = true;
    if (this.loginFormGroup.valid) {
      this.subscription = this.rxHttp.post({ body: this.loginFormGroup.value, path: "UserAuthentication/EmailVerification" }).subscribe((data: any) => {
        this.notificationService.success("Forgot password link sent on your email.");
        this.activeForgotPassword();
      })
    }
  }
}
