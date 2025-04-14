import { PageViewModel } from 'src/app/database-model/page';
import { RxFormGroup } from '@rxweb/reactive-form-validators';
import { Subscription } from 'rxjs';

export class PageDomain {
  page: PageViewModel;
  pageFormGroup: RxFormGroup;
  showComponent: boolean = false;
  pageList: any[] = [];
  pageLocations: any[] = [];
  subscription: Subscription[] = [];
  pageId: number = 0;

}
