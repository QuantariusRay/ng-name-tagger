export type Comment = {
  message: string;
  sender: User;
  date: string;
}

export type User = {
  firstName: string;
  lastName: string | null;
  userId: number | null;
}