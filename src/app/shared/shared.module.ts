import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SanitizeHtmlPipe } from '../pipe/sanitize-html.pipe';
import { MenuItems } from './menu-items';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    SanitizeHtmlPipe,
    ArticleCardComponent,
    AvatarComponent,
    AuthFormComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    SanitizeHtmlPipe,
    ArticleCardComponent,
    AvatarComponent,
    AuthFormComponent,
    MatIconModule
  ],
  providers: [MenuItems]
})
export class SharedModule { }
