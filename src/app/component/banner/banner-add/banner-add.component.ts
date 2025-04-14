import { Component, OnInit } from '@angular/core';
import { RxFormBuilder, RxFormGroup } from '@rxweb/reactive-form-validators';
import { RxHttp } from '@rxweb/http';
import { StorageService } from 'src/app/domain/service/storage-service';
import { NotificationService } from 'src/app/domain/service/notification/notificaiton-service';
import { Router } from '@angular/router';
import { BannerDomain } from '../banner-domain';
import { BannerViewModel } from 'src/app/database-model/banner';
import { APIResponseViewModel } from 'src/app/view-model/api-response-view-model';

@Component({
  selector: 'app-banner-add',
  templateUrl: './banner-add.component.html',
  styleUrls: ['./banner-add.component.css']
})
export class BannerAddComponent extends BannerDomain implements OnInit {

  constructor(private rxFormBuilder: RxFormBuilder,
    private rxHttp: RxHttp,
    private storageService: StorageService,
    notificationService: NotificationService,
    private router: Router
  ) {
    super();
    this.notificationService = notificationService;
  }

  ngOnInit() {
    this.banner = new BannerViewModel();
    this.banner.statusId = 1;
    this.banner.bannerId = 0
    this.banner.createdById = this.storageService.userId;
    this.banner.createdByDate = new Date().toDateString();
    this.bannerFormGroup = <RxFormGroup>this.rxFormBuilder.formGroup(BannerViewModel, this.banner)
    this.showComponent = true;
  }

  addBanner() {
    this.bannerFormGroup.submitted = true;
    if (this.bannerFormGroup.valid) {
      let data: FormData;
      data = this.bannerFormGroup.toFormData();
      this.subscription.push(this.rxHttp.post({ path: "banner", body: data }).subscribe((resp: APIResponseViewModel) => {
        this.notificationService.success("Banner added");
        this.router.navigate(["/banner"]);
      }))
    }
  }
}
