import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { parse } from 'url';
import { Subscription } from 'rxjs';
import { RxFormGroup, RxFormBuilder } from '@rxweb/reactive-form-validators';
import { UserCredentialViewModel, UserForgotPasswordViewModel } from 'src/app/view-model/user-credentail-view-model';
import { RxHttp } from '@rxweb/http';
import { StorageService } from 'src/app/domain/service/storage-service';
import { NotificationService } from 'src/app/domain/service/notification/notificaiton-service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
})
export class VerificationComponent implements OnInit {

  userId: number;
  verficationCode: string;
  emailId: string;
  showComponent: boolean = false;
  isSuccess: boolean = false;
  subscription: Subscription;
  loginFormGroup: RxFormGroup;
  userCredentialViewModel: UserForgotPasswordViewModel;
  constructor(private route: ActivatedRoute,
    private rxHttp: RxHttp,
    private rxFormBuilder: RxFormBuilder,
    private storageService: StorageService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    //this.route.params.subscribe(params => {
    //  this.userPoolId = params['poolid'];
    //  this.userId = params['userid'];
    //});
    this.route.queryParams.subscribe(params => {
      this.userId = parseInt(params["userId"])
      this.verficationCode = params["verficationCode"]
      this.emailId = params["emailId"]
    });
    this.rxHttp.badRequest = (errorMessage: any) => {
      let data = document.getElementById("loader");
      data.classList.remove("loading")
      this.notificationService.error(errorMessage);
    }
  }

  ngOnInit() {
    this.userCredentialViewModel = new UserForgotPasswordViewModel();
    this.userCredentialViewModel.email = this.emailId;
    this.userCredentialViewModel.verificationCode = this.verficationCode;
    this.userCredentialViewModel.userId = this.userId;
    this.loginFormGroup = <RxFormGroup>this.rxFormBuilder.formGroup(UserForgotPasswordViewModel, this.userCredentialViewModel)
    this.showComponent = true;
  }

  resetPassword() {
    this.loginFormGroup.submitted = true;
    if (this.loginFormGroup.valid) {
      this.subscription = this.rxHttp.post({ body: this.loginFormGroup.value, path: "UserAuthentication/ResetPassword" }).subscribe((data: any) => {
        this.notificationService.success("Password reset successfully");
        this.router.navigate(["/login"])
      })
    }
  }

} 
