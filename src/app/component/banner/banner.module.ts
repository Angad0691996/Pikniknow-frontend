import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannerRoutingModule } from './banner-routing.module';
import { BannerListComponent } from './banner-list/banner-list.component';
import { BannerAddComponent } from './banner-add/banner-add.component';
import { BannerEditComponent } from './banner-edit/banner-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

@NgModule({
  declarations: [BannerListComponent, BannerAddComponent, BannerEditComponent],
  imports: [
    CommonModule,
    BannerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
  ]
})
export class BannerModule { }
