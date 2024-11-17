import { Injectable } from '@nestjs/common';

import { User } from './user.entity';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 1,
      username: 'admin',
      password: 'password',
      role: 'admin',
    },
    {
      id: 2,
      username: 'user',
      password: 'password',
      role: 'user',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
