import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserAddComponent } from './user-add/user-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { UserListComponent } from './user-list/user-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogModule } from 'src/app/domain/service/dialog/confirm-dialog-module';
import { MatIconModule } from "@angular/material/icon";
import { MatSortModule, MatTooltipModule} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    MatDialogModule,
    ConfirmDialogModule,
    MatIconModule,
    MatTooltipModule,
    MatSortModule
  ],
  exports: [UserAddComponent, UserEditComponent],
  declarations: [UserAddComponent, UserEditComponent, UserListComponent],
  entryComponents: [UserAddComponent, UserEditComponent]
})
export class UserModule { }
