import { Component, OnInit, Inject,HostListener } from '@angular/core';
import { RxHttp } from '@rxweb/http';
import { Subscription } from 'rxjs';
import { APIResponseViewModel } from 'src/app/view-model/api-response-view-model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/domain/service/notification/notificaiton-service';

@Component({
  selector: 'app-user-list',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialog implements OnInit {
  subscription: Subscription;
  state :{story: any, statusId: number, message: string};
  story: any; statusId: number; message: string;
  message1:string;
  constructor(

    private rxHttp: RxHttp,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<ConfirmDialog>,
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
    this.story=this.state.story;
    this.statusId=this.state.statusId;
    this.message=this.state.message;
    if(this.statusId==9){
        this.message1="Approve";
    }
    if(this.statusId==10){
        this.message1="Reject";
    }
    if(this.statusId==3){
        this.message1="Delete";
    }

  }
  
  
  manageStory(story: any, statusId: number, message: string) {
    let body = {
      storyId: story.storyId,
      statusId: statusId
    }
    this.subscription = this.rxHttp.post({ path: "story/UpdateStory", body: body }).subscribe((data: APIResponseViewModel) => {
      this.notificationService.success(message);
      this.dialogRef.close(body);
    })
  }
  
  
  close() {
    this.dialogRef.close();
  }
}