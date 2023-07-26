import { Component } from '@angular/core';
import { CommentBoxComponent, CommentFormInterfaceComponent, CommentListComponent } from '@ng-name-tagger/ui';
import { AppStore } from './app.store';
import { PushPipe } from '@ngrx/component';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    CommentBoxComponent,
    CommentFormInterfaceComponent,
    CommentListComponent,
    CommentListComponent,
    PushPipe,
    NgIf
  ],
  selector: 'ng-name-tagger-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppStore]
})
export class AppComponent {
  title = 'ng-name-tagger';

  constructor(public readonly store: AppStore) {}

}
