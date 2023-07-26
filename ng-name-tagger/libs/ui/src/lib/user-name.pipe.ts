import { Pipe, PipeTransform } from '@angular/core';
import { User } from './models/comment.type';

@Pipe({
  name: 'userName',
  standalone: true,
})
export class UserNamePipe implements PipeTransform {

  transform(user: User): string {
    return `${ user.firstName ?? '' } ${ user.lastName ?? '' }` ?? '';
  }
}