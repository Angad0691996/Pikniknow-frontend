import { Component, OnInit, Inject,HostListener } from '@angular/core';
import { RxHttp } from '@rxweb/http';
import { Subscription } from 'rxjs';
import { APIResponseViewModel } from 'src/app/view-model/api-response-view-model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/domain/service/notification/notificaiton-service';

@Component({
  selector: 'app-userconfirm-dialog',
  templateUrl: './userconfirm-dialog.component.html',
  styleUrls: ['./userconfirm-dialog.component.css']
})
export class UserconfirmDialogComponent implements OnInit {
  subscription: Subscription;
  state :{user: any,  message: string};
  user: any; message: string;
  userId:number;
  message1:string;
  
  constructor(private rxHttp: RxHttp,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<UserconfirmDialogComponent>,
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
    this.user=this.state.user;
    this.userId=this.state.user.userId;
    this.message=this.state.message;

  }
     
  deleteUser(userId: number) {
    this.rxHttp.delete({ path: "user", params: [userId], body: null }).subscribe((data: APIResponseViewModel) => {
      this.notificationService.success("User Deleted");
    });
    this.dialogRef.close(null);

  }
  
  
  close() {
    this.dialogRef.close();
  }
}