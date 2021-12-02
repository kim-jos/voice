import { Injectable } from '@nestjs/common';
import { UsersService } from '../user/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  private apiKeys: string[] = [
    'ca03na188ame03u1d78620de67282882a84',
    'd2e621a6646a4211768cd68e26f21228a81',
  ];

  async validateApiKey(apiKey: string) {
    return this.apiKeys.find((key) => apiKey === key);
  }
}
