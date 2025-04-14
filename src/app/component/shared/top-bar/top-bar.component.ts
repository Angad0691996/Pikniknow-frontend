import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/domain/service/storage-service';
import { Router } from '@angular/router';
import { IS_LOGIN, TOKEN, LOGIN_USER, ACTIVE_MENU } from 'src/app/domain/constant/constants';
import { NotificationService } from 'src/app/domain/service/notification/notificaiton-service';
import { RxHttp } from '@rxweb/http';
import { Subscription } from 'rxjs';
import { UserAddComponent } from '../../user/user-add/user-add.component';
import { MatDialog } from '@angular/material/dialog';
import { UserEditComponent } from '../../user/user-edit/user-edit.component';
import { APIResponseViewModel } from 'src/app/view-model/api-response-view-model';
import { UserBase } from 'src/app/database-model/user-base';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
  entryComponents: [UserAddComponent, UserEditComponent]
})
export class TopBarComponent implements OnInit {

  userName: 'XYZ';
  userRole: any;
  subscription: Subscription;
  constructor(private storageService: StorageService,
    private router: Router,
    private notificationService: NotificationService,
    private rxHttp: RxHttp,
    public dialog: MatDialog,

  ) {

    this.rxHttp.badRequest = (errorMessage: any) => {
      let data = document.getElementById("loader");
      data.classList.remove("loading")
      this.notificationService.error(errorMessage);

    }


  }
  ngOnInit() {
    this.rxHttp.get({ path: "User", params: [this.storageService.userId] }).subscribe((data: APIResponseViewModel) => {
      if (data.response) {
        this.userName = data.response.userName;
        var roleId = data.response.roleId;
        if (roleId == '1') {
          this.userRole = 'Administrator';
        }
        if (roleId == '2') {
          this.userRole = 'Editor';
        }
        if (roleId == '3') {
          this.userRole = 'Subscriber';
        }

      }
    })
  }

  logout() {
    this.subscription = this.rxHttp.post({ body: null, path: "UserAuthorization/logout" }).subscribe((data: any) => {
      this.storageService.remove(IS_LOGIN);
      this.storageService.remove(TOKEN);
      this.storageService.remove(LOGIN_USER);
      this.storageService.remove(ACTIVE_MENU);
      this.notificationService.success("Logout Successfully");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    })
  }

  editUser() {
    const dialogRef = this.dialog.open(UserAddComponent, {
      width: '500px',
      data: { userId: this.storageService.userId },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  changePassword() {
    const dialogRef = this.dialog.open(UserEditComponent, {
      width: '500px',
      data: { userId: this.storageService.userId },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
