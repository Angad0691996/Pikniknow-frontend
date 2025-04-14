import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { RxHttp } from '@rxweb/http';
import { Subscription } from 'rxjs';
import { APIResponseViewModel } from 'src/app/view-model/api-response-view-model';
import { UserAddComponent } from '../user/user-add/user-add.component';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/domain/service/notification/notificaiton-service';
import { ConfirmDialogService } from 'src/app/domain/service/dialog/confirm-dialog-service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserconfirmDialogComponent } from 'src/app/component/user/user-list/userconfirm-dialog/userconfirm-dialog.component';
import { E } from '@angular/cdk/keycodes';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-editor-table',
  templateUrl: './editor-table.component.html',
  styleUrls: ['./editor-table.component.css']
})
export class EditorTableComponent implements OnInit {
  roleForm: FormGroup;
  roles = [
    { name: 'All', value: '' },
    { name: 'Administrator', value: '1' },
    { name: 'Editor', value: '2' },
    { name: 'Subscriber', value: '3' }
  ]
  pageIndex = 1;
  search_input: string = '';
  rowCount = 10;
  loadedAll = false;
  isAscSort: boolean = true;

  users: any[] = []
  showComponent: boolean = false;
  subscription: Subscription;
  search: string = "";
  totalUser: number = 0;
  searchFreeText: any = {
    "searchFreeText": "",
    "userRoleId": 2
  };
  constructor(private rxHttp: RxHttp, public dialog: MatDialog,
    private notificationService: NotificationService, private fb: FormBuilder
  ) {
    this.rxHttp.badRequest = (errorMessage: any) => {
      let data = document.getElementById("loader");
      data.classList.remove("loading")
      this.notificationService.error(errorMessage);
    }
  }

  ngOnInit() {
    var tempRole = '2';

    this.roleForm = this.fb.group({
      roleControl: [tempRole]
    });
    this.searchFreeText['userRoleId'] = tempRole;
    this.bindUser();


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
    this.users.sort((a, b) => a.count - b.count);
    // console.log(this.users);


    // var x=localStorage.getItem('roleTypeId');
    // if(x!=null&&x!=''&&this.pageIndex==1){
    //   this.filterValue(x,'userRoleId');
    // }
  }

  filterValue(value: any, type: any) {
    console.log('Value');
    this.searchFreeText[type] = value;
    this.searchFilter();
    if(value=='1'||value=='2'||value=='3'||value=='')
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
        this.pageIndex += 2;
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
    this.search_input='';
    this.searchFreeText = {
      "searchFreeText": "",
      "userRoleId": 2
    };
    
    this.searchFilter();
    
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


  sortData(sort: Sort) {
    // console.log('IN Sort Data');
    const data = this.users.slice();
    if (!sort.active || sort.direction === '') {
      this.users = data;

      return;
    }
    sort.direction=this.isAscSort?'desc':'asc';
    this.isAscSort=!this.isAscSort;
    this.users = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'userName':
          return compare(a.userName.toLowerCase(), b.userName.toLowerCase(), isAsc);
        default:
          return 0;
      }
    });
  }

}


function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

