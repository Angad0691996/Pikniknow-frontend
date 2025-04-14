import { UserCountComponent } from './component/user-count/user-count.component';
import {StoryCountComponent} from './component/story-count/story-count.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/authentication/login/login.component';
import { AuthGuard } from './domain/service/auth-guard-service';
import { HomeComponent } from './home/home.component';
import {ConfirmDialog} from './component/story/story-list/confirm-dialog/confirm-dialog.component';
import {UsersPopup} from '../app/component/user-count/users-popup/users-popup.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { UserModule } from './component/user/user.module';
import { DashboardComponent } from './component/authentication/dashboard/dashboard.component';
import { RegistrationComponent } from './component/authentication/registration/registration.component';
import { VerificationComponent } from './component/authentication/verfication/verification.component';
import { CommonModule } from '@angular/common';
import { VisitorTableComponent } from './component/visitor-table/visitor-table.component';
import { EditorTableComponent } from './component/editor-table/editor-table.component';
import { UserconfirmDialogComponent } from './component/user/user-list/userconfirm-dialog/userconfirm-dialog.component';
import { PageconfirmDialogComponent } from './component/page/page-list/pageconfirm-dialog/pageconfirm-dialog.component';
import { BannerconfirmDialogComponent } from './component/banner/banner-list/bannerconfirm-dialog/bannerconfirm-dialog.component';
const routes: Routes = [
  { path: "user", loadChildren: './component/user/user.module#UserModule', canActivate: [AuthGuard], data: { pageName: 'User' } },
  { path: "story", loadChildren: './component/story/story.module#StoryModule', canActivate: [AuthGuard], data: { pageName: 'Story' } },
  { path: "banner", loadChildren: './component/banner/banner.module#BannerModule', canActivate: [AuthGuard], data: { pageName: 'Banner' } },
  { path: "page", loadChildren: './component/page/page.module#PageModule', canActivate: [AuthGuard], data: { pageName: 'Page' } },
  { path: 'login', component: LoginComponent, data: { pageName: 'Login' } },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { pageName: 'Dashboard' } },
  { path: 'registration', component: RegistrationComponent, data: { pageName: 'Registration' } },
  { path: 'forgot-password', component: VerificationComponent, data: { pageName: 'Verification' } },
  { path: '', component: DashboardComponent, pathMatch: 'full', canActivate: [AuthGuard], data: { pageName: 'Dashboard' }},
  { path: "user-count", component: UserCountComponent, canActivate: [AuthGuard], data: { pageName: 'user-count' }  },
  { path: "story-count", component: StoryCountComponent, canActivate: [AuthGuard], data: { pageName: 'story-count' }  },
  { path: "user-count-popup", component: UsersPopup, canActivate: [AuthGuard], data: { pageName: 'user-count-popup' }  },
  { path: "confirm-dialog", component: ConfirmDialog, canActivate: [AuthGuard], data: { pageName: 'confirm-dialog' }  },
  { path: "userconfirm-dialog", component: UserconfirmDialogComponent, canActivate: [AuthGuard], data: { pageName: 'userconfirm-dialog'} },
  { path: "pageconfirm-dialog", component: PageconfirmDialogComponent, canActivate: [AuthGuard], data: { pageName: 'pageconfirm-dialog'} },
  { path: "bannerconfirm-dialog", component: BannerconfirmDialogComponent, canActivate: [AuthGuard], data: { pageName: 'bannerconfirm-dialog'} },
  { path: "visitor-table", component: VisitorTableComponent, canActivate: [AuthGuard], data: {pageName: 'visitor-table'}},
  { path: "editor-table", component: EditorTableComponent, canActivate: [AuthGuard], data: {pageName: 'editor-table'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash:true })      ],
  // imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
