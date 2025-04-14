import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/domain/service/notification/notificaiton-service';
import { ActivatedRoute, Router } from '@angular/router';
import { RxHttp } from '@rxweb/http';
import { StorageService } from 'src/app/domain/service/storage-service';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/domain/enum/enums';
import { APIResponseViewModel } from 'src/app/view-model/api-response-view-model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  showComponent: boolean = false;
  subscription: Subscription;
  dashboardCount: any;
  constructor(private notificationService: NotificationService,
    private route: ActivatedRoute,
    private rxHttp: RxHttp,
    private storageService: StorageService,
    private router: Router) {
    this.rxHttp.badRequest = (errorMessage: any) => {
      let data = document.getElementById("loader");
      data.classList.remove("loading")
      this.notificationService.error(errorMessage);
    }
  }

  ngOnInit() {
    this.subscription = this.rxHttp.get({ path: "Lookups/Dashboard" }).subscribe((response: APIResponseViewModel) => {
      debugger
      if (response.response) {
        this.dashboardCount = JSON.parse(response.response);
        this.dashboardCount = this.dashboardCount[0];
        // console.log(this.dashboardCount);

      }
      this.showComponent = true;
    })

  }
  //{ queryParams: { searchQuery: JSON.stringify(this.articleFilter), userId: 0 }, path: "ArticleAccessRole", propName: "articleAccessRole", },
}
