import { Component, OnInit, Inject,HostListener } from '@angular/core';
import { RxHttp } from '@rxweb/http';
import { Subscription } from 'rxjs';
import { APIResponseViewModel } from 'src/app/view-model/api-response-view-model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/domain/service/notification/notificaiton-service';

@Component({
  selector: 'app-bannerconfirm-dialog',
  templateUrl: './bannerconfirm-dialog.component.html',
  styleUrls: ['./bannerconfirm-dialog.component.css']
})
export class BannerconfirmDialogComponent implements OnInit {
  subscription: Subscription;
  state :{banner: any,  message: string};
  banner: any; message: string;
  bannerId:number;
  message1:string;
  constructor(private rxHttp: RxHttp,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<BannerconfirmDialogComponent>,
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
    console.log(this.state);
    this.banner=this.state.banner;
    this.bannerId=this.state.banner.bannerId;
    this.message=this.state.message;
  }
  deleteBanner(bannerId: number) {
    this.rxHttp.delete({ path: "banner", params: [bannerId], body: null }).subscribe((data: APIResponseViewModel) => {
      this.notificationService.success("Banner Deleted");
    });
    this.dialogRef.close(null);
  }
  
  
  close() {
    this.dialogRef.close();
  }
}

