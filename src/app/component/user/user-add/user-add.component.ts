import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder, RxFormGroup } from '@rxweb/reactive-form-validators';
import { UserBase } from 'src/app/database-model/user-base';
import { StorageService } from 'src/app/domain/service/storage-service';
import { RxHttp } from '@rxweb/http';
import { APIResponseViewModel } from 'src/app/view-model/api-response-view-model';
import { NotificationService } from 'src/app/domain/service/notification/notificaiton-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  userFormGroup: RxFormGroup;
  showComponent = false;
  userId = 0;
  constructor(private rxFormBuilder: RxFormBuilder,
    private storageService: StorageService,
    private rxHttp: RxHttp,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<UserAddComponent>,
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
    if (this.userId == 0) {
      let user = new UserBase();
      user.statusId = 1;
      user.createdByDate = new Date().toDateString();
      user.createdById = this.storageService.userId;
      this.userFormGroup = <RxFormGroup>this.rxFormBuilder.formGroup(UserBase, user);
      this.showComponent = true;
    }
    else {
      this.rxHttp.get({ path: "User", params: [this.userId] }).subscribe((data: APIResponseViewModel) => {
        if (data.response) {
          this.userFormGroup = <RxFormGroup>this.rxFormBuilder.formGroup(UserBase, data.response);
          this.showComponent = true;
        }
      })
    }
  }

  addUser() {
    this.userFormGroup.submitted = true;
    if (this.userFormGroup.valid) {
      if (this.userId == 0) {
        this.rxHttp.post({ path: "user", body: this.userFormGroup.toFormData() }).subscribe((data: APIResponseViewModel) => {
          this.notificationService.success("User Added");
          this.dialogRef.close(data);
        })
      }
      else {
        this.rxHttp.post({ path: "user", body: this.userFormGroup.toFormData(), params: [this.userId] }).subscribe((data: APIResponseViewModel) => {
          this.notificationService.success("User Edited");
          this.dialogRef.close(data);
        })
      }
    }
  }

  close() {
    this.dialogRef.close();
  }

}
