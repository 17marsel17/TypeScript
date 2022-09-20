import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email);

    if (user && bcrypt.compare(password, user.password)) {
      const result = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
      };

      return result;
    }

    return null;
  }

  async validateUserJwt(email: string, id: string) {
    console.log('email', email, id);
    const user = await this.userService.findOne(email);

    if (user && user.id === id) {
      const result = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
      };
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      id: user.id,
      firstName: user.firstName,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
