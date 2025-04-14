import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageListComponent } from './page-list/page-list.component';
import { PageAddComponent } from './page-add/page-add.component';
import { PageEditComponent } from './page-edit/page-edit.component';


const routes: Routes = [
  { path: "", component: PageListComponent },
  { path: "add", component: PageAddComponent },
  { path: ":id", component: PageEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
