import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JournalRoutingModule } from './journal-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';
import { MaterialModule } from '../shared/material.module';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { CategoryComponent } from './dialog/category/category.component';
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
    JournalRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    SharedModule
  ]
})
export class JournalModule { }
