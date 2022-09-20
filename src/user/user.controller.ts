import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserSignInDto, UserSignUpDto } from './dto/user.dto';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/guard/jwt-guard';

@Controller('/api/user')
export class UserController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('/signup')
  async signup(@Body() userSignUpDto: UserSignUpDto) {
    const user = await this.userService.createNewUser(userSignUpDto);

    return user;
  }

  @Post('/signin')
  async signin(@Body() userSignInDto: UserSignInDto) {
    const user = await this.authService.validateUser(
      userSignInDto.email,
      userSignInDto.password,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.authService.login(user);
  }

  @UseGuards(JwtGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    console.log('req', req);
    return req.user;
  }
}
