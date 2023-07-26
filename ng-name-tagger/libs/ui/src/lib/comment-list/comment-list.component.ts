import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CommentItemComponent } from '../comment-item/comment-item.component';
import { Comment } from '../models/comment.type';

@Component({
  selector: 'comment-list',
  standalone: true,
  imports: [CommonModule, CommentItemComponent],
  template: `
      <ul>
          <ng-container *ngFor="let comment of comments">
              <comment-item [comment]="comment"/>
          </ng-container>
      </ul>
  `,
  styles: [`
    ul {
        padding-left: 0;
    }
  `]
})
export class CommentListComponent {
  @Input() comments!: Comment[];
}