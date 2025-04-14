import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoryListComponent } from './story-list/story-list.component';
import { StoryEditComponent } from './story-edit/story-edit.component';
import { StoryAddComponent } from './story-add/story-add.component';

const routes: Routes = [
  {
    path: "", component: StoryListComponent
  },
  {
    path: "add", component: StoryAddComponent
  },
  {
    path: ":id", component: StoryEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoryRoutingModule { }
