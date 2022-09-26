import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { User, UserSignInDto, UserSignUpDto } from './dto/user.dto';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/guard/jwt-guard';

@Controller('/api/user')
export class UserController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('/signup')
  async signup(@Body() userSignUpDto: UserSignUpDto): Promise<UserSignUpDto> {
    const user = await this.userService.findOne(userSignUpDto.email);

    if (user) {
      throw new HttpException('user with this email already exists', 409);
    }

    return await this.userService.createNewUser(userSignUpDto);
  }

  @Post('/signin')
  async signin(
    @Body() userSignInDto: UserSignInDto,
  ): Promise<{ access_token: string }> {
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
  getProfile(@Request() req): Promise<User> {
    console.log('req', req);
    return req.user;
  }
}
