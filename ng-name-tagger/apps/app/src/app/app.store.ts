import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Comment, User } from '@ng-name-tagger/ui';
import { concatMap, of, pipe } from 'rxjs';
import { AppService } from './app.service';

export interface AppState {
  comments: Comment[];
  users: User[];
}

@Injectable()
export class AppStore extends ComponentStore<AppState> {
  public readonly comments$ = this.select(state => state.comments);
  public readonly users$ = this.select(state => state.users);

  public readonly getComments = this.effect(
    pipe(
      concatMap(() => this.service.getComments()),
      tapResponse((res: Comment[]) => {
        this.patchState((state: AppState) => ({
          ...state,
          comments: res,
        }));
      }, console.error),
    ),
  );

  public readonly getUsers = this.effect(
    pipe(
      concatMap(() => this.service.getAssociatedUsers()),
      tapResponse((res: User[]) => {
        this.patchState((state: AppState) => ({
          ...state,
          users: res,
        }));
      }, console.error),
    ),
  );

  constructor(private readonly service: AppService) {
    super({
      comments: [],
      users: []
    });

    this.getComments(of(null));
    this.getUsers(of(null));
  }
}
