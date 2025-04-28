import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from '../user.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private user: UserService) {
    super({
      usernameField: 'userName',
    });
  }
  async validate(userName: string, password: string) {
    let user = await this.user.validate(userName, password);
    return user;
  }
}
