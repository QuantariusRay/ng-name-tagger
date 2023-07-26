import {
  Component, forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NameTaggerDirective } from '../name-tagger.directive';
import { UserNamePipe } from '../user-name.pipe';
import { CommentInterfaceStore } from '../comment-form-interface/comment-interface.store';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { PushPipe } from '@ngrx/component';

@Component({
  selector: 'comment-box',
  standalone: true,
  imports: [
    CommonModule,
    NameTaggerDirective,
    UserNamePipe,
    ReactiveFormsModule,
    PushPipe,
  ],
  template: `
    <textarea
      [formControl]="comment"
      ngNameTagger
      data-cy="comment-box"
      [userNames]="store.filteredUsers()">
    </textarea>
  `,
  styles: [`
    textarea {
      width: 700px;
      height: 200px;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CommentBoxComponent),
      multi: true
    },
  ]
})
export class CommentBoxComponent implements ControlValueAccessor {
  comment: FormControl = new FormControl('');
  onTouched = () => {};

  constructor(public store: CommentInterfaceStore) {
  }

  registerOnTouched(touched: () => void): void {
    this.onTouched = touched;
    this.comment.statusChanges.subscribe(() => {
      this.onTouched();
    });
  }

  registerOnChange(onChanged: (string: string) => void): void {
    this.comment.valueChanges.subscribe((val: string) => {
      onChanged(val);
    });
  }

  writeValue(comment: string): void {
    this.comment.patchValue(comment);
  }
}
