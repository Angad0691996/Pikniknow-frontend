import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageDomain } from '../page-domain';
import { RxFormBuilder, RxFormGroup } from '@rxweb/reactive-form-validators';
import { StorageService } from 'src/app/domain/service/storage-service';
import { RxHttp } from '@rxweb/http';
import { PageViewModel } from 'src/app/database-model/page';
import { NotificationService } from 'src/app/domain/service/notification/notificaiton-service';
import { APIResponseViewModel } from 'src/app/view-model/api-response-view-model';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent extends PageDomain implements OnInit {

  constructor(private route: ActivatedRoute,
    private rxFormBuilder: RxFormBuilder,
    private rxHttp: RxHttp,
    private storageService: StorageService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    super()
    this.route.params.subscribe(params => {
      this.pageId = params['id'];
    });
  }

  ngOnInit() {
    this.loadPageLocations();
  }

  loadPageLocations() {
    this.subscription.push(this.rxHttp.lookup([
      { propName: "generic", path: "Lookups" },
      { propName: "page", path: "page", params: [this.pageId] }
    ]).subscribe((response: any) => {
      this.pageLocations = JSON.parse(response.generic.response);
      this.pageLocations = this.pageLocations[0].applicationObject.filter(x => x.applicationObjectTypeName == 'Page Name');
      this.pageFormGroup = <RxFormGroup>this.rxFormBuilder.formGroup(PageViewModel, response.page.response)
      this.showComponent = true;
    }));
  }

  editPage() {
    this.pageFormGroup.submitted = true;
    if (this.pageFormGroup.valid) {
      this.subscription.push(this.rxHttp.put({ path: "page", body: this.pageFormGroup.value, params: [this.pageId] }).subscribe((resp: APIResponseViewModel) => {
        this.notificationService.success("Page edited");
        this.router.navigate(["/page"]);
      }))
    }
  }

}
