import { Component, OnInit } from '@angular/core';
import { BannerDomain } from '../banner-domain';
import { RxHttp } from '@rxweb/http';
import { NotificationService } from 'src/app/domain/service/notification/notificaiton-service';
import { APIResponseViewModel } from 'src/app/view-model/api-response-view-model';
import { BannerconfirmDialogComponent } from './bannerconfirm-dialog/bannerconfirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.css']
})
export class BannerListComponent extends BannerDomain implements OnInit {

  bannerList: any[] = [];
  constructor(private rxHttp: RxHttp, public dialog: MatDialog,
    notificationService: NotificationService
  ) {
    super();
    this.notificationService = notificationService;
  }

  ngOnInit() {
    this.subscription.push(this.rxHttp.get({ path: "banner" }).subscribe((response: APIResponseViewModel) => {
      this.bannerList = response.response;
    }))
  }
  showPopup(banner: any, message: string) {

    const dialogRef = this.dialog.open( BannerconfirmDialogComponent , {
      width: '500px',
      data: { state:{banner:banner, message: message }},
      maxHeight: '80vh' 
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    }); 
   
  }


  deleteBanner(bannerId: number) {
    this.subscription.push(this.rxHttp.delete({ path: "banner", params: [bannerId], body: null }).subscribe((response: APIResponseViewModel) => {
      this.bannerList = response.response;
      this.notificationService.success("Banner Deleted");
      this.ngOnInit();
    }))
  }
}
