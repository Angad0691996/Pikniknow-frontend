import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { RxHttp } from '@rxweb/http';
import { Subscription } from 'rxjs';
import { APIResponseViewModel } from 'src/app/view-model/api-response-view-model';

import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/domain/service/notification/notificaiton-service';
import { ConfirmDialogService } from 'src/app/domain/service/dialog/confirm-dialog-service';
declare const L: any;
@Component({
  selector: 'app-story-list',
  templateUrl: './story-count.component.html',
  styleUrls: ['./story-count.component.css']
})
export class StoryCountComponent {
  
  pageIndex = 1;
  rowCount = 1500;
  loadedAll = false;
  story: any[] = [];
  storyCount: any[] = [];
  showComponent: boolean = false;
  subscription: Subscription;
  search: string = "";
  totalUser: number = 0;
  searchFreeText: any = {
    "searchFreeText": "",
    "storyRoleId": 0
  };
  constructor(private rxHttp: RxHttp, public dialog: MatDialog,
    private notificationService: NotificationService) {
    this.rxHttp.badRequest = (errorMessage: any) => {
      let data = document.getElementById("loader");
      data.classList.remove("loading")
      this.notificationService.error(errorMessage);
    }
  }

  ngOnInit() {
    this.bindstory();   
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


  bindstory() {
    this.subscription = this.rxHttp.get({
      path: "story",
      queryParams:
        { orderByColumn: "", sortOrder: "", pageIndex: this.pageIndex, rowCount: this.rowCount, searchQuery: JSON.stringify(this.searchFreeText), storyId: 0, roleId: 0 }
    }).subscribe((res: APIResponseViewModel) => {
      if (res.response) {
        let story = JSON.parse(res.response);
        if (story.length > 0) {
          story.forEach(obj => {
            this.story.push(obj)
          })
          console.log('stories',this.story);
          this.totalUser = this.story[0].totalCount;
          this.story.map(story => {
            if (story.state == null) {
              story.state = 'Others'
            }

            if (!this.isContains(this.storyCount, story.state)) {
              // console.log(!this.isContains(this.userCount, user.state));
              this.storyCount.push({
                state: story.state,
                count: 1
              });
            }
            else {
              this.storyCount.map(userC => {
                if (userC.state == story.state)
                  userC.count++;
              });
            }
          });
          this.storyCount.sort((a, b) => a.count - b.count);
          // console.log(this.userCount);

          let mymap = L.map('map').setView([20.5937, 78.9629], 5.5 );
          L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicHJpeWFuc2hzb2xhbmtpMSIsImEiOiJja3FxN21qOTIxNDE0MnducDlmNWk5d2hvIn0.PD0TJ4_671xA1r609fbUww', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'your.mapbox.access.token'
          }).addTo(mymap);


          // this.getCity(21.1702, 72.8311);


          this.story.map(u=>{
            if (u.latitude != null && u.longitude != null) {
              // this.getCity(u.latitude,u.longitude);
              let marker = L.marker([u.latitude, u.longitude]).addTo(mymap);
              marker.bindPopup('<b>'+u.locationName+'</b>');
            }
          });
        }
      }

      this.showComponent = true;
    });




  }
 getCity(lat,lng) {
    var xhr = new XMLHttpRequest();
    var lat = lat;
    var lng = lng;
  
    // Paste your LocationIQ token below.
    xhr.open('GET', "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat="+lat+"&lon="+lng, true);
    xhr.send();
    xhr.onreadystatechange = processRequest;
    xhr.addEventListener("readystatechange", processRequest, false);
  
    function processRequest(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            // var city = response.address.city;
            console.log(response);
            return;
        }
    }
}
  

  

  }
