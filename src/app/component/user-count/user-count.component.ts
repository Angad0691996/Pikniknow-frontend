import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { RxHttp } from '@rxweb/http';
import { Subscription } from 'rxjs';
import { APIResponseViewModel } from 'src/app/view-model/api-response-view-model';
import { HostBinding } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/domain/service/notification/notificaiton-service';
import { ConfirmDialogService } from 'src/app/domain/service/dialog/confirm-dialog-service';
import { UsersPopup } from '../user-count/users-popup/users-popup.component';
import { Sort } from '@angular/material/sort';
declare const L: any;
@Component({
  selector: 'app-user-list',
  templateUrl: './user-count.component.html',
  styleUrls: ['./user-count.component.css']
})
export class UserCountComponent {
  
  isFullScreen = false;
  pageIndex = 1;
  rowCount = 1500;
  loadedAll = false;
  users: any[] = [];
  userCount: any[] = [];
  showComponent: boolean = false;
  subscription: Subscription;
  search: string = "";
  totalUser: number = 0;
  isAscSort:boolean=true;
  searchFreeText: any = {
    "searchFreeText": "",
    "userRoleId": 0
  };
  constructor(private rxHttp: RxHttp, public dialog: MatDialog,
    private notificationService: NotificationService ){
    this.rxHttp.badRequest = (errorMessage: any) => {
      let data = document.getElementById("loader");
      data.classList.remove("loading")
      this.notificationService.error(errorMessage);
    }
  }
  width:number=100;
  height:number=50;
  zoom:number=4.5;
  


  ngOnInit() {
    this.bindUser();  
  }
  elem=document.documentElement;
  Fullscreen(){
    // if(this.elem.requestFullscreen){
      this.isFullScreen = true;
      // this.elem.requestFullscreen();
    // }
    this.height=100
    this.zoom=6.5;
  


  }
  closefullscreen(){
    // if(document.exitFullscreen){
      this.isFullScreen = false;
      // document.exitFullscreen();
    // }
    // console
    this.height=50;
  }
 
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  isContains(json, value) {
    let contains = false;
    Object.keys(json).some(key => {
      contains = typeof json[key] === 'object' ? this.isContains(json[key], value) : json[key] === value;
      return contains;
    });
    return contains;
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
          // console.log('user',this.users);
          this.totalUser = this.users[0].totalCount;
          this.users.map(user => {
            if (user.state == null) {
              user.state = 'Others'
            }

            if (!this.isContains(this.userCount, user.state)) {
              // console.log(!this.isContains(this.userCount, user.state));
              this.userCount.push({
                state: user.state,
                count: 1
              });
            }
            else {
              this.userCount.map(userC => {
                if (userC.state == user.state)
                  userC.count++;
              });
            }
          });
          this.userCount.sort((a, b) => a.count - b.count);
          // console.log(this.userCount);

          let mymap = L.map('map').setView([20.5937, 78.9629], this.zoom );
          L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicHJpeWFuc2hzb2xhbmtpMSIsImEiOiJja3FxN21qOTIxNDE0MnducDlmNWk5d2hvIn0.PD0TJ4_671xA1r609fbUww', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'your.mapbox.access.token'
          }).addTo(mymap);
          this.users.map(u=>{
            if (u.latitude != null && u.longitude != null) {
              let marker = L.marker([u.latitude, u.longitude]).addTo(mymap);
              marker.bindPopup('<b>'+u.userName+'</b>');
            }
          });
          
        }
      }

      this.showComponent = true;
    });

  }

  showPopup(state: string) {
    const dialogRef = this.dialog.open(UsersPopup, {
      width: '500px',
      data: { state: state },
      maxHeight: '80vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result)
      }
    });
   
  }
  sortData(sort: Sort) {
    // console.log('IN Sort Data');
    const data = this.userCount.slice();
    if (!sort.active || sort.direction === '') {
      this.userCount = data;
     
      return;
    }
    sort.direction=this.isAscSort?'desc':'asc';
    this.isAscSort=!this.isAscSort;
    this.userCount = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'count':
          return compare(a.count, b.count, isAsc);
        case 'state':
          return compare(a.state, b.state, isAsc);
        default:
          return 0;
      }
    });
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}