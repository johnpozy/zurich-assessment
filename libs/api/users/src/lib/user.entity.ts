export class User {
  id: number;
  username: string;
  password: string;
  role: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
