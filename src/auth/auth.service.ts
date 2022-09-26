import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findOne(email);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    if (user && bcrypt.compare(password, user.password)) {
      return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
      };
    }

    return null;
  }

  async validateUserJwt(email: string, id: string): Promise<User> {
    const user = await this.userService.findOne(email);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    if (user && user.id === id) {
      return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
      };
    }

    return null;
  }

  async login(user: any): Promise<{ access_token: string }> {
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
