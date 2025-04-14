import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';

import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { SideBarComponent } from './component/shared/side-bar/side-bar.component';
import { FooterBarComponent } from './component/shared/footer-bar/footer-bar.component';
import { TopBarComponent } from './component/shared/top-bar/top-bar.component';
import { BreadcrumbComponent } from './component/shared/breadcrumb/breadcrumb.component';
import { BraodcastService } from './domain/service/broadcast-service';
import { StorageService } from './domain/service/storage-service';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators'
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './component/authentication/login/login.component';
import { DashboardComponent } from './component/authentication/dashboard/dashboard.component';
import { AuthGuard } from './domain/service/auth-guard-service';
import { RegistrationComponent } from './component/authentication/registration/registration.component';
import { RxHttp } from '@rxweb/http';
import { NotificationService } from './domain/service/notification/notificaiton-service';
import { AngularDualListBoxModule } from 'angular-dual-listbox';
import { VerificationComponent } from './component/authentication/verfication/verification.component';
import { ConfirmDialogModule } from './domain/service/dialog/confirm-dialog-module';
import { ConfirmDialogComponent } from './domain/service/dialog/confirm-dialog.component';
import { SignalRService } from './domain/service/signal-r.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { UserAddComponent } from './component/user/user-add/user-add.component';
import { UserModule } from './component/user/user.module';
import {UsersPopup} from './component/user-count/users-popup/users-popup.component';
import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';
import { UserCountComponent } from './component/user-count/user-count.component';
import {ConfirmDialog} from './component/story/story-list/confirm-dialog/confirm-dialog.component';
import { UserconfirmDialogComponent } from './component/user/user-list/userconfirm-dialog/userconfirm-dialog.component';
import { PageconfirmDialogComponent } from './component/page/page-list/pageconfirm-dialog/pageconfirm-dialog.component';
import { BannerconfirmDialogComponent } from './component/banner/banner-list/bannerconfirm-dialog/bannerconfirm-dialog.component';
import { StoryCountComponent } from './component/story-count/story-count.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DatePipe } from '@angular/common';
import { VisitorTableComponent } from './component/visitor-table/visitor-table.component';
import { EditorTableComponent } from './component/editor-table/editor-table.component';
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FetchDataComponent,
    SideBarComponent,
    FooterBarComponent,
    TopBarComponent,
    BreadcrumbComponent,
    LoginComponent,
    DashboardComponent,
    RegistrationComponent,
    VerificationComponent,
    UserCountComponent,
    StoryCountComponent,
    UsersPopup,
    ConfirmDialog,
    UserconfirmDialogComponent,
    PageconfirmDialogComponent,
    BannerconfirmDialogComponent,
    VisitorTableComponent,
    EditorTableComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    AppRoutingModule,
    AngularDualListBoxModule,
    ConfirmDialogModule,
    BrowserAnimationsModule,
    MatDialogModule,
    UserModule,
    CommonModule,
    BrowserModule,
    MatTooltipModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy },AuthGuard,DatePipe, SignalRService,StorageService, BraodcastService, RxHttp, NotificationService],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
