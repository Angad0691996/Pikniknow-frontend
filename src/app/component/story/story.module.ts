import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoryRoutingModule } from './story-routing.module';
import { StoryAddComponent } from './story-add/story-add.component';
import { StoryEditComponent } from './story-edit/story-edit.component';
import { StoryListComponent } from './story-list/story-list.component';
import { StoryViewComponent } from './story-view/story-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MaskProvider } from '@rxweb/reactive-form-validators/domain/element-processor/mask.provider';
@NgModule({
  declarations: [StoryAddComponent, StoryEditComponent, StoryListComponent, StoryViewComponent,],
  imports: [
    CommonModule,
    StoryRoutingModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
  ]
})
export class StoryModule { }
