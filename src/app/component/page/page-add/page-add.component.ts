import { Component, OnInit } from '@angular/core';
import { PageDomain } from '../page-domain';
import { RxFormBuilder, RxFormGroup } from '@rxweb/reactive-form-validators';
import { RxHttp } from '@rxweb/http';
import { PageViewModel } from 'src/app/database-model/page';
import { StorageService } from 'src/app/domain/service/storage-service';
import { APIResponseViewModel } from 'src/app/view-model/api-response-view-model';
import { NotificationService } from 'src/app/domain/service/notification/notificaiton-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-add',
  templateUrl: './page-add.component.html',
  styleUrls: ['./page-add.component.css']
})
export class PageAddComponent extends PageDomain implements OnInit {


  constructor(private rxFormBuilder: RxFormBuilder,
    private rxHttp: RxHttp,
    private storageService: StorageService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.loadPageLocations();
  }

  loadPageLocations() {
    this.subscription.push(this.rxHttp.lookup([
      { propName: "generic", path: "Lookups" }
    ]).subscribe((response: any) => {
      this.pageLocations = JSON.parse(response.generic.response);
      this.pageLocations = this.pageLocations[0].applicationObject.filter(x => x.applicationObjectTypeName == 'Page Name');
      this.page = new PageViewModel();
      this.page.statusId = 1;
      this.page.createdById = this.storageService.userId;
      this.page.createdByDate = new Date().toDateString();
      this.pageFormGroup = <RxFormGroup>this.rxFormBuilder.formGroup(PageViewModel, this.page)
      this.showComponent = true;
    }));
  }

  addPage() {
    this.pageFormGroup.submitted = true;
    if (this.pageFormGroup.valid) {
      this.subscription.push(this.rxHttp.post({ path: "page", body: this.pageFormGroup.value }).subscribe((resp: APIResponseViewModel) => {
        this.notificationService.success("Page added");
        this.router.navigate(["/page"]);
      }))
    }
  }
}
