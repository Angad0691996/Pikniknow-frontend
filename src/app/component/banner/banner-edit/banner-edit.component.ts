import { Component, OnInit } from '@angular/core';
import { BannerDomain } from '../banner-domain';
import { ActivatedRoute, Router } from '@angular/router';
import { RxFormBuilder, RxFormGroup } from '@rxweb/reactive-form-validators';
import { RxHttp } from '@rxweb/http';
import { StorageService } from 'src/app/domain/service/storage-service';
import { NotificationService } from 'src/app/domain/service/notification/notificaiton-service';
import { BannerViewModel } from 'src/app/database-model/banner';
import { APIResponseViewModel } from 'src/app/view-model/api-response-view-model';

@Component({
  selector: 'app-banner-edit',
  templateUrl: './banner-edit.component.html',
  styleUrls: ['./banner-edit.component.css']
})
export class BannerEditComponent extends BannerDomain implements OnInit {

  constructor(private route: ActivatedRoute,
    private rxFormBuilder: RxFormBuilder,
    private rxHttp: RxHttp,
    private storageService: StorageService,
    notificationService: NotificationService,
    private router: Router
  ) {
    super()
    this.notificationService = notificationService;
    this.route.params.subscribe(params => {
      this.bannerId = params['id'];
    });
  }

  ngOnInit() {
    this.subscription.push(this.rxHttp.get({ path: "banner", params: [this.bannerId] }
    ).subscribe((response: any) => {
      debugger
      this.bannerFormGroup = <RxFormGroup>this.rxFormBuilder.formGroup(BannerViewModel, response.response)
      this.showComponent = true;
    }));
  }


  editBanner() {
    this.bannerFormGroup.submitted = true;
    if (this.bannerFormGroup.valid) {
      this.subscription.push(this.rxHttp.put({ path: "banner", body: this.bannerFormGroup.toFormData(), params: [this.bannerId] }).subscribe((resp: APIResponseViewModel) => {
        this.notificationService.success("Banner edited");
        this.router.navigate(["/banner"]);
      }))
    }
  }
}
