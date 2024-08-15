import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent {
  @Input() title!: string;
  @Input() categoryName!: string;
  @Input() publicationDate!: Date;
  @Input() userEmail!: string;
  @Input() likeCount!: number;
  @Input() commentCount!: number;
  @Input() avatarColor!: string;

  @Output() cardClick = new EventEmitter<void>();


  getInitials(): string {
    return this.userEmail.charAt(0).toUpperCase();
  }

  onCardClick(): void {
    this.cardClick.emit();
  }
}
