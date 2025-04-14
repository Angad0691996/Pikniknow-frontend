import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/domain/service/notification/notificaiton-service';
import { RxHttp } from '@rxweb/http';
import { Subscription } from 'rxjs';
import { RxFormGroup, RxFormBuilder, password } from '@rxweb/reactive-form-validators';
import { UserBase, UserChangePasswordBase } from 'src/app/database-model/user-base';
import { Role } from 'src/app/domain/enum/enums';
import { StorageService } from 'src/app/domain/service/storage-service';
import { FRONT_URL } from 'src/app/domain/constant/constants';
import { APIResponseViewModel } from 'src/app/view-model/api-response-view-model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {
    

  userFormGroup: RxFormGroup;
  showComponent = false;
  userId = 0;
  constructor(private rxFormBuilder: RxFormBuilder,
    private storageService: StorageService,
    private rxHttp: RxHttp,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<UserEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.rxHttp.badRequest = (errorMessage: any) => {
      let data = document.getElementById("loader");
      data.classList.remove("loading")
      this.notificationService.error(errorMessage);
    }
    this.userId = this.data.userId;
  }

  ngOnInit() {
    this.rxHttp.get({ path: "User", params: [this.userId] }).subscribe((data: APIResponseViewModel) => {
      if (data.response) {
        this.userFormGroup = <RxFormGroup>this.rxFormBuilder.formGroup(UserChangePasswordBase, data.response);
        this.userFormGroup.patchValue({ isChangePassword: true });
        this.showComponent = true;
      }
    })
  }

  changePassword() {
    this.userFormGroup.submitted = true;
    if (this.userFormGroup.valid) {
      this.rxHttp.post({ path: "user", body: this.userFormGroup.toFormData(), params: [this.userId] }).subscribe((data: APIResponseViewModel) => {
        this.notificationService.success("Password updated");
        this.dialogRef.close(data);
      })
    }
  }

  close() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
   
  }
}
