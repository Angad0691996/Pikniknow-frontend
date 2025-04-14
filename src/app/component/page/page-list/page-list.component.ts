import { Component, OnInit } from '@angular/core';
import { RxHttp } from '@rxweb/http';
import { PageDomain } from '../page-domain';
import { APIResponseViewModel } from 'src/app/view-model/api-response-view-model';
import { NotificationService } from 'src/app/domain/service/notification/notificaiton-service';
import { PageconfirmDialogComponent } from 'src/app/component/page/page-list/pageconfirm-dialog/pageconfirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent extends PageDomain implements OnInit {

  pageList: any[] = [];
  
  constructor(private rxHttp: RxHttp, public dialog: MatDialog,
    private notificationService: NotificationService
  ) { super(); }

  ngOnInit() {
    this.subscription.push(this.rxHttp.get({ path:"page" }).subscribe((response: APIResponseViewModel) => {
      this.pageList = response.response;
    }))
  }
  

  showPopup(page: any, message: string) {

    const dialogRef = this.dialog.open( PageconfirmDialogComponent , {
      width: '500px',
      data: { state:{page:page, message: message }},
      maxHeight: '80vh' 
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    }); 
   
  }
  deletePage(pageId: number) {
    this.subscription.push(this.rxHttp.delete({ path: "page", params: [pageId], body:null }).subscribe((response: APIResponseViewModel) => {
      this.pageList = response.response;
      this.notificationService.success("Page Deleted");
      this.ngOnInit();
    }))
  }
}
