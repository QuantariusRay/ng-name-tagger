import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { CommentInterfaceStore } from '../comment-form-interface/comment-interface.store';
import { UserNamePipe } from '../user-name.pipe';

@Component({
  standalone: true,
  selector: 'user-panel',
  template: `<ul data-cy="filter-list">
      <ng-container *ngIf="store.filteredUsers().length">
          <li *ngFor="let user of store.filteredUsers()" 
              class="list-name"
              (click)="this.selectionHandler(user)">{{ user | userName}}</li>
      </ng-container>
  </ul>`,
  imports: [NgForOf, NgIf, UserNamePipe],
  styles: [`
    :host {
        display: block;
        background-color: white;
        border: 1px solid black;
        min-width: 150px;
        max-width: 250px;
        max-height: 300px;
        position: absolute;
        top: var(--panel-position-y);
        left: var(--panel-position-x);
    }
    
    ul {
        padding-left: 0;
        list-style: none;
    }
    
    li {
        color: initial;
        cursor: pointer;
        padding: 4px 8px;
    }
    
    li:hover {
        background-color: blue;
        color: white;
    }
  `]
})
export class UserPanelComponent {
  @HostBinding('style.--panel-position-y')
  @Input() panelPositionY: string = '0px';

  @HostBinding('style.--panel-position-x')
  @Input() panelPositionX: string = '0px';

  @Input() selectionHandler: (el: string) => void = () => {};

  constructor(public readonly store: CommentInterfaceStore) {

  }

}