import { UserNamePipe } from './user-name.pipe';
import { User } from './models/comment.type';

describe('UserName pipe', () => {
  let pipe: UserNamePipe;

  beforeEach(() => {
    pipe = new UserNamePipe();
  });

  it('should convert a user object into a full name string', () => {
    const testUser: User = {
      firstName: 'Test',
      lastName: 'User',
      userId: 1
    };

    expect(pipe.transform(testUser)).toBe('Test User');
  });
})