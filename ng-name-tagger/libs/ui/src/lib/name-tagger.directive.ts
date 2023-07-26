import {
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Input, OnInit,
  ViewContainerRef,
} from '@angular/core';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { User } from './models/comment.type';
import { NgControl } from '@angular/forms';
import { CommentInterfaceStore } from './comment-form-interface/comment-interface.store';
import { filter, mergeMap, map, of, iif, tap, withLatestFrom } from 'rxjs';
import { TagCheckService } from './tag-check.service';

@Directive({
  selector: 'textarea[ngNameTagger]',
  standalone: true,
})
export class NameTaggerDirective implements OnInit {

  @Input() userNames!: User[];

  constructor(
    private readonly el: ElementRef,
    private readonly control: NgControl,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly store: CommentInterfaceStore,
    private readonly tagService: TagCheckService
  ) {}

  @HostListener('document:click', ['$event', '$event.target'])
  dismissPanel(event: MouseEvent, target: HTMLElement): void {
    if (this.el.nativeElement.contains(target)) {
      return;
    } else {
      this.clearViewContainer();
    }
  }

  ngOnInit() {
    if (!this.control) {
      throw new Error('A form control value is required in order to watch changes on the textarea.');
    }

    // @ts-ignore
    this.control.control?.valueChanges.pipe(
      mergeMap((val: string) => iif(
        () => this.tagService.testString(val),
        of(val),
        of(null).pipe(
          tap(() => this.clearViewContainer())
        )
      )),
      filter(val => !!val),
      // @ts-ignore
      withLatestFrom(this.store.userSet$),
      map(([value, users]: [string, User[]]) => {
        const matchIndex = this.tagService.getMatcherIndex(value);
        const filteredUsers = users.filter(
          (user: User) => {
            const fullName = `${ user.firstName } ${ user.lastName }`;
            return fullName.toLowerCase().includes(value.substring(matchIndex + 1).toLowerCase());
          }
        );

        if (!filteredUsers.length) {
          this.clearViewContainer();
        }

        return filteredUsers;
      }),
      filter(user => !!user),
      tap(() => {
        // check if the viewContainer exists, so we don't make several of them.
        if (!this.viewContainerRef.length) {
          const component: ComponentRef<UserPanelComponent> = this.viewContainerRef.createComponent(UserPanelComponent);
          const textareaPosition = this.el.nativeElement.getBoundingClientRect();
          // add 1rem for line-height + 4 for padding/margin
          component.setInput('panelPositionY', (textareaPosition.top + 20)  + 'px');
          component.setInput('panelPositionX', (textareaPosition.left + 4)  + 'px');
          component.setInput('selectionHandler', this.updateTextWithUserSelection);
        }
      })
    ).subscribe(
      (res: User[]) => {
        this.store.setFilteredUsers(of(res))
      }
    );
  }

  private updateTextWithUserSelection = (value: User): void => {
    if (value) {
      const fullName = `${ value.firstName ?? '' } ${ value.lastName ?? '' }`;
      this.el.nativeElement.value = this.tagService.replaceTextWithValue(this.el.nativeElement.value, fullName)
      this.clearViewContainer();
      this.el.nativeElement.focus();
      this.el.nativeElement.setSelectionRange(this.el.nativeElement.value.length , this.el.nativeElement.value.length);
    } else {
      return;
    }
  }

  private clearViewContainer() {
    if (this.viewContainerRef.length) {
      this.viewContainerRef.clear();
    }
  }
}
