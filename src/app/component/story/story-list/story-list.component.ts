import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { RxHttp } from '@rxweb/http';
import { APIResponseViewModel } from 'src/app/view-model/api-response-view-model';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/domain/service/notification/notificaiton-service';
import { ActivatedRoute } from '@angular/router';
import {ConfirmDialog} from './confirm-dialog/confirm-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, } from '@angular/material/dialog';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})
export class StoryListComponent implements OnInit, OnDestroy {
  popUpStory:any;
  roleForm: FormGroup;
  roles = [
    {name:'All',value:''},
    {name:'Approved',value:'9'},
    {name:'Rejected',value:'10'},
    {name:'Pending',value:'11'}
  ]
  search_input: string = '';
  story: any[] = []
  showComponent: boolean = false;
  subscription: Subscription;
  search: string = "";
  totalStory: number = 0;
  pageIndex = 1;
  rowCount = 10;
  statusId: number;
  loadedAll = false;
  searchFreeText: any = {
    "searchFreeText": "",
    "loginUserId": 0,
    "isAdmin": 1,
    "statusId": "",
    "date": ""
  };
  constructor(private rxHttp: RxHttp,
    private route: ActivatedRoute,
    private notificationService: NotificationService,public dialog: MatDialog,private fb: FormBuilder) {

    this.route.queryParams.subscribe(params => {
      if (params['typeId']) {
        this.statusId = params['typeId'];
        this.filterValue(this.statusId, 'statusId',false);
      }
    });

    this.rxHttp.badRequest = (errorMessage: any) => {
      let data = document.getElementById("loader");
      data.classList.remove("loading")
      this.notificationService.error(errorMessage);
    }
  }

  ngOnInit() {
    var tempRole='';
    if(localStorage.getItem('roleTypeId')!=null){
      tempRole=localStorage.getItem('roleTypeId');
    }
    this.roleForm = this.fb.group({
      roleControl: [tempRole]
    });
    this.searchFreeText['userRoleId']=tempRole;
    this.bindStory();
   
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
 bindStory() {
    this.subscription = this.rxHttp.get({
      path: "story",
      queryParams:
        { userId: 0, searchQuery: JSON.stringify(this.searchFreeText), orderByColumn: "", sortOrder: "", pageIndex: this.pageIndex, rowCount: this.rowCount, storyId: 0, roleId: 0 }
    }).subscribe((res: APIResponseViewModel) => {
      if (res.response) {
        // this.story = JSON.parse(res.response);
         // console.log(story);

        let story = JSON.parse(res.response);
        if (story.length > 0) {
          story.forEach(obj => {
            // console.log(this.story);
            this.story.push(obj)

          })
          this.totalStory = this.story[0].totalCount;
        }
      }
      this.hideLoadMoreButtom(this.pageIndex, this.rowCount, this.totalStory);
      this.showComponent = true;

    });
  }

  filterValue(value: any, type: any,isMain:any) {
      this.searchFreeText[type] = value;
    if ((value != 11&&value!=10 &&value!=0)||isMain ) {
     this.searchFilter();
    }
  }
  @HostListener("window:scroll", [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      if (this.loadedAll) {
        this.pageIndex += 1;
        this.bindStory();

      }
    } else if ((window.innerHeight + window.scrollY) < document.body.offsetHeight) {
    }
  }

  detectBottom(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      if (this.loadedAll) {
        this.pageIndex += 1;
        this.bindStory();
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
      path: "story",
      queryParams:
        { userId: 0, searchQuery: JSON.stringify(this.searchFreeText), orderByColumn: "", sortOrder: "", pageIndex: this.pageIndex, rowCount: this.rowCount, storyId: 0 }
    }).subscribe((res: APIResponseViewModel) => {
      if (res.response) {
        this.loadedAll = true;
        this.story = JSON.parse(res.response);
        // console.log('story',this.story);
        if (this.story.length > 0) {
          this.totalStory = this.story[0].totalCount;
        }
        else {
          this.totalStory = 0;
        }
      }
      this.showComponent = true;
    });
  }

  reset() {
    this.search_input='';
    localStorage.setItem('roleTypeId','');
    this.searchFreeText = {
      "searchFreeText": "",
      "loginUserId": 0,
      "isAdmin": 1,
      "statusId": "",
      "date": ""
    }
    this.searchFilter();
    this.roleForm = this.fb.group({
      roleControl: ['']
    });
    
  }

  showPopup(story: any, statusId: number, message: string) {

    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '500px',
      data: { state:{story: story, statusId: statusId, message: message} },
      maxHeight: '80vh' 
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // console.log(result)
        this.searchFilter();

      }
    }); 
   
  }
  showNewPopup(story: any) {

    console.log(story);
    this.popUpStory=story;
      
  }

  
}
