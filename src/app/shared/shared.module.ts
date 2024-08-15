import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SanitizeHtmlPipe } from '../pipe/sanitize-html.pipe';
import { MenuItems } from './menu-items';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    SanitizeHtmlPipe,
    ArticleCardComponent,
    AvatarComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ],
  exports: [SanitizeHtmlPipe,
    ArticleCardComponent,
    AvatarComponent],
  providers: [MenuItems]
})
export class SharedModule { }
