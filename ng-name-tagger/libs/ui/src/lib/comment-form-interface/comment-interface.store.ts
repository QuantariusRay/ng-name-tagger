import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, pipe } from 'rxjs';
import { User } from '../models/comment.type';

export enum ToggleText {
  Cancel = 'Cancel',
  Add = 'Add Comment'
}

export interface CommentInterfaceState {
  commentVisible: boolean;
  userSet: User[];
  filteredUserset: User[];
  toggleText: ToggleText;

}
@Injectable()
export class CommentInterfaceStore extends ComponentStore<CommentInterfaceState> {
  public readonly commentVisible = this.selectSignal(state => state.commentVisible);
  public readonly toggleText = this.selectSignal(state => state.toggleText);
  public readonly userSet$ = this.select(state => state.userSet);
  public readonly filteredUsers = this.selectSignal(state => state.filteredUserset);

  public readonly toggleVisibility = this.effect(
    pipe(
      tapResponse(() => {
        this.patchState((state: CommentInterfaceState) => ({
          ...state,
          commentVisible: !state.commentVisible,
          toggleText: state.commentVisible ? ToggleText.Add : ToggleText.Cancel
        }))
      }, console.error)
  ));

  public readonly setUserset = this.effect((users$: Observable<User[]>) =>
    users$.pipe(
      tapResponse(
        (res: User[]) => this.patchState(state => ({ ...state, userSet: res })),
        console.error
      )
    )
  );

  public readonly setFilteredUsers = this.effect(
    pipe(
      tapResponse(
        (res: User[]) => this.patchState(state => ({ ...state, filteredUserset: res })),
        console.error
      )
    )
  );

  constructor() {
    super({
      commentVisible: false,
      userSet: [],
      filteredUserset: [],
      toggleText: ToggleText.Add
    });
  }

}