import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { HelpDetailsComponent } from './help-details/help-details.component';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';
import { MaterialModule } from '../shared/material.module';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { CategoryComponent } from './dialog/category/category.component';
import { QuillModule } from 'ngx-quill';
import { SharedModule } from '../shared/shared.module';
import { ManageArticleComponent } from './manage-article/manage-article.component';
import { ArticlesComponent } from './dialog/articles/articles.component';
import { ViewArticleComponent } from './dialog/view-article/view-article.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { ChangePasswordComponent } from './dialog/change-password/change-password.component';


@NgModule({
  declarations: [
    DashboardComponent,
    LayoutComponent,
    LayoutComponent,
    HelpDetailsComponent,
    ConfirmationComponent,
    ManageUsersComponent,
    ManageCategoryComponent,
    CategoryComponent,
    ManageArticleComponent,
    ArticlesComponent,
    ViewArticleComponent,
    SidebarComponent,
    HeaderComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    QuillModule.forRoot(),
    SharedModule
  ]
})
export class AdminModule { }
