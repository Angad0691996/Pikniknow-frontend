import { Component, OnInit, Inject,HostListener } from '@angular/core';
import { RxHttp } from '@rxweb/http';
import { Subscription } from 'rxjs';
import { APIResponseViewModel } from 'src/app/view-model/api-response-view-model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/domain/service/notification/notificaiton-service';

@Component({
  selector: 'app-pageconfirm-dialog',
  templateUrl: './pageconfirm-dialog.component.html',
  styleUrls: ['./pageconfirm-dialog.component.css']
})
export class PageconfirmDialogComponent implements OnInit {
  subscription: Subscription;
  state :{page: any,  message: string};
  page: any; message: string;
  pageId:number;
  message1:string;
  constructor(private rxHttp: RxHttp,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<PageconfirmDialogComponent>,
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
    this.page=this.state.page;
    this.pageId=this.state.page.pageId;
    this.message=this.state.message;

  }
  deletePage(pageId: number) {
    this.rxHttp.delete({ path: "page", params: [pageId], body: null }).subscribe((data: APIResponseViewModel) => {
      this.notificationService.success("Page Deleted");
    });
    this.dialogRef.close(null);
  }
  
  
  close() {
    this.dialogRef.close();
  }
}
