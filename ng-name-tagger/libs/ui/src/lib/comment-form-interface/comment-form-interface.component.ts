import { Component, Input, OnInit } from '@angular/core';
import { CommentBoxComponent } from '../comment-box/comment-box.component';
import { CommentInterfaceStore } from './comment-interface.store';
import { NgIf } from '@angular/common';
import { User } from '../models/comment.type';
import { of } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'comment-form-interface',
  template: `
      <div class="action-row">
          <button type="button" 
                  data-cy="toggle-button"
                  (click)="store.toggleVisibility(null)">{{ store.toggleText() }}</button>
      </div>
      <ng-container *ngIf="store.commentVisible()">
          <comment-box [formControl]="newComment"></comment-box>
      </ng-container>
  `,
  imports: [CommentBoxComponent, NgIf, ReactiveFormsModule],
  styles: [`
      .action-row {
          display: flex;
          justify-content: flex-end;
      }
  `],
  providers: [CommentInterfaceStore]
})
export class CommentFormInterfaceComponent implements OnInit {
  @Input() userSet!: User[];

  public newComment = new FormControl('');

  constructor(public readonly store: CommentInterfaceStore) {}

  ngOnInit() {
    this.store.setUserset(of(this.userSet));
  }
}