import { Component, OnInit, Inject,HostListener } from '@angular/core';
import { RxHttp } from '@rxweb/http';
import { Subscription } from 'rxjs';
import { APIResponseViewModel } from 'src/app/view-model/api-response-view-model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/domain/service/notification/notificaiton-service';

@Component({
  selector: 'app-user-list',
  templateUrl: './users-popup.component.html',
  styleUrls: ['./users-popup.component.css']
})
export class UsersPopup implements OnInit {
  pageIndex = 1;
  rowCount = 1500;
  loadedAll = false;
  users: any[] = [];
  showComponent: boolean = false;
  subscription: Subscription;
  searchFreeText: any = {
    "searchFreeText": "",
    "userRoleId": 0
  };
  state :string;
  constructor(

    private rxHttp: RxHttp,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<UsersPopup>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    
  ) {
    this.rxHttp.badRequest = (errorMessage: any) => {
      let data = document.getElementById("loader");
      data.classList.remove("loading")
      this.notificationService.error(errorMessage);
    }
    this.state = this.data.state;
  }

  ngOnInit() {
    // console.log(this.state);
    this.bindUser();
  }
  bindUser() {
    this.subscription = this.rxHttp.get({
      path: "user",
      queryParams:
        { orderByColumn: "", sortOrder: "", pageIndex: this.pageIndex, rowCount: this.rowCount, searchQuery: JSON.stringify(this.searchFreeText), userId: 0, roleId: 0 }
    }).subscribe((res: APIResponseViewModel) => {
      if (res.response) {
        let users = JSON.parse(res.response);
        if (users.length > 0) {
          users.forEach(obj => {
            // console.log(obj)
            if (this.state == 'Others') {
              if (obj.state == null) {
                this.users.push(obj)
              }
            }
            else{
              if (obj.state == this.state) {
                this.users.push(obj)
              }
            }
          })
          // console.log(this.users);
        }
      }

    });
  }
  @HostListener("window:scroll", [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      if (this.loadedAll) {
        this.pageIndex += 1;
        this.bindUser();

      }
    } else if ((window.innerHeight + window.scrollY) < document.body.offsetHeight) {
    }
  }
  
  
}