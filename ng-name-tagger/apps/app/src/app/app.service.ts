import { Injectable } from '@angular/core';
import { Comment, User } from '@ng-name-tagger/ui';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppService {

  /**
   * In most systems, the context of who will show up in the typeahead is usually a team, a project, or something else,
   * like the context of the text chain. You could create a selector based on the senders of comments, but I'm assuming
   * there is some way to get an association of users or something? Maybe if the user-set is small, just retrieve it all
   * when we need it.
   */
  getAssociatedUsers(): Observable<User[]> {
    return of([
      { userId: 1,
        firstName: 'Kevin',
        lastName: 'Durant'
      },
      {
        userId: 2,
        firstName: 'Jeff',
        lastName: 'George'
      },
      {
        userId: 3, firstName: 'Bryan',
        lastName: 'Edwards'
      },
      {
        userId: 4,
        firstName: 'Gabbey',
        lastName: 'Jenkins'
      },
    ]);
  }

  getComments(): Observable<Comment[]> {
    return of([
      {
        message: 'This task was assigned to Daryl Babb',
        sender: {
          firstName: 'System',
          lastName: null,
          userId: null
        },
        date: '2020-04-03T11:00:00-05:00'
      },
      {
        message: 'Waiting on Parts',
        sender: {
          firstName: 'System',
          lastName: null,
          userId: null
        },
        date: '2020-04-03T11:00:00-05:00'
      },
      {
        message: '@Bryan Can you order parts?',
        sender: {
          firstName: 'System',
          lastName: null,
          userId: null
        },
        date: '2020-04-03T11:02:00-05:00'
      }
    ])
  }
}
