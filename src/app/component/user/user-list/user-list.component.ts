import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { RxHttp } from '@rxweb/http';
import { Subscription } from 'rxjs';
import { APIResponseViewModel } from 'src/app/view-model/api-response-view-model';
import { UserAddComponent } from '../user-add/user-add.component';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/domain/service/notification/notificaiton-service';
import { ConfirmDialogService } from 'src/app/domain/service/dialog/confirm-dialog-service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserconfirmDialogComponent } from './userconfirm-dialog/userconfirm-dialog.component';
import { E } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  roleForm: FormGroup;
  roles = [
    { name: 'All', value: '00' },
    { name: 'Administrator', value: '1' },
    { name: 'Editor', value: '2' },
    { name: 'Subscriber', value: '3' }
  ]
  search_input: string = '';
  pageIndex = 1;
  rowCount = 10;
  loadedAll = false;
  statusId: number;
  users: any[] = []
  showComponent: boolean = false;
  subscription: Subscription;
  search: string = "";
  totalUser: number = 0;
  searchFreeText: any = {
    "searchFreeText": "",
    "userRoleId": 0
  };
  constructor(private rxHttp: RxHttp, public dialog: MatDialog,
    private route: ActivatedRoute,
    private notificationService: NotificationService, private fb: FormBuilder
  ) {
    this.route.queryParams.subscribe(params => {
      if (params['typeId']) {
        console.log(params['typeId']);
        var tempRole=params['typeId'];
        localStorage.setItem('roleTypeId',tempRole);

        this.roleForm = this.fb.group({
          roleControl: [tempRole]
        });
        this.searchFreeText['userRoleId'] = tempRole;
        this.bindUser();
       
      }
    });

    this.rxHttp.badRequest = (errorMessage: any) => {
      let data = document.getElementById("loader");
      data.classList.remove("loading")
      this.notificationService.error(errorMessage);
    }
  }

  ngOnInit() {
    // var tempRole = '';
    // if (localStorage.getItem('roleTypeId') != null) {
    //   tempRole = localStorage.getItem('roleTypeId');
    // }
    // this.roleForm = this.fb.group({
    //   roleControl: [tempRole]
    // });
     // this.searchFreeText['userRoleId'] = tempRole;
    // this.bindUser();


  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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
            this.users.push(obj)
          })
          this.totalUser = this.users[0].totalCount;
        }
      }
      this.hideLoadMoreButtom(this.pageIndex, this.rowCount, this.totalUser);
      this.showComponent = true;
    });

    // var x=localStorage.getItem('roleTypeId');
    // if(x!=null&&x!=''&&this.pageIndex==1){
    //   this.filterValue(x,'userRoleId');
    // }
  }

  filterValue(value: any, type: any,isMain:any) {
    this.searchFreeText[type] = value;
    this.searchFilter();
    if ((value == '1' || value == '2' || value == '3' || value == '')||isMain)
      localStorage.setItem('roleTypeId', value);
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

  detectBottom(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      if (this.loadedAll) {
        this.pageIndex += 1;
        this.bindUser();
      }
    }
  }

  hideLoadMoreButtom(pageNumber: number, rowCount: number, totalCount: number): void {
    let data = pageNumber * rowCount;
    this.loadedAll = (pageNumber * rowCount < totalCount);
  }

  searchFilter() {
    this.pageIndex = 1;
    this.subscription = this.rxHttp.get({
      path: "user",
      queryParams:
        { orderByColumn: "", sortOrder: "", pageIndex: this.pageIndex, rowCount: this.rowCount, searchQuery: JSON.stringify(this.searchFreeText), userId: 0, roleId: 0 }
    }).subscribe((res: APIResponseViewModel) => {
      if (res.response) {
        this.loadedAll = true;
        this.users = JSON.parse(res.response);
        if (this.users.length > 0) {
          this.totalUser = this.users[0].totalCount;
        }
        else {
          this.totalUser = 0;
        }
      }
      this.showComponent = true;
    });

  }

  addUser(): void {
    const dialogRef = this.dialog.open(UserAddComponent, {
      width: '500px',
      data: { userId: 0 },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.searchFilter();
      }
    });
  }

  deleteUser(userId: number) {
    this.rxHttp.delete({ path: "user", params: [userId], body: null }).subscribe((data: APIResponseViewModel) => {
      this.notificationService.success("User Deleted");
      this.searchFilter();
    })
  }

  editUser(userId: number) {
    const dialogRef = this.dialog.open(UserAddComponent, {
      width: '500px',
      data: { userId: userId },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.searchFilter();
      }
    });
  }

  reset() {
    localStorage.setItem('roleTypeId', '');

    this.search_input = '';
    this.searchFreeText = {
      "searchFreeText": "",
      "userRoleId": 0
    };

    this.searchFilter();
    this.roleForm = this.fb.group({
      roleControl: ['']
    });
  }
  showPopup(user: any, message: string) {

    const dialogRef = this.dialog.open(UserconfirmDialogComponent, {
      width: '500px',
      data: { state:{user:user, message: message }},
      maxHeight: '80vh' 
    });
    dialogRef.afterClosed().subscribe(result => {
      this.searchFilter();
    }); 
   
  }


 

  
}
