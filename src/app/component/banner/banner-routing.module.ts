import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BannerListComponent } from './banner-list/banner-list.component';
import { BannerAddComponent } from './banner-add/banner-add.component';
import { BannerEditComponent } from './banner-edit/banner-edit.component';


const routes: Routes = [
  { path: "", component: BannerListComponent },
  { path: "add", component: BannerAddComponent },
  { path: ":id", component: BannerEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BannerRoutingModule { }
