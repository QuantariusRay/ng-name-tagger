import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Comment } from '../models/comment.type';
import { UserNamePipe } from '../user-name.pipe';

@Component({
  selector: 'comment-item',
  standalone: true,
  imports: [CommonModule, UserNamePipe],
  template: `
      <li>
          <div class="comment-message">{{ comment.message }}</div>
          <div class="comment-meta">
              <span>{{ comment.sender | userName }}</span> - <span>{{ comment.date | date }}</span>
          </div>
      </li>
  `,
  styles: [`
      :host {
          display: block;
          border-bottom: 1px solid black;
      }

      li {
          display: flex;
          padding: 12px;
      }

      .comment-message {
          flex: 1;
          padding-left: 8px;
      }
  `],
})
export class CommentItemComponent {
  @Input() comment!: Comment;
}