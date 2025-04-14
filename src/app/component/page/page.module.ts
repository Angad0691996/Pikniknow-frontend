import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';
import { PageAddComponent } from './page-add/page-add.component';
import { PageEditComponent } from './page-edit/page-edit.component';
import { PageListComponent } from './page-list/page-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { MatSortModule, MatTooltipModule} from '@angular/material';


@NgModule({
  declarations: [PageAddComponent, PageEditComponent, PageListComponent],
  imports: [
    CommonModule,
    PageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    MatTooltipModule,
    MatSortModule,
  ]
})
export class PageModule { }
