import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { JWT_SECRET_KEY } from '../../config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET_KEY,
    });
  }

  public async validate(payload: { email: string; id: string }) {
    console.log('payload', payload);
    const user = await this.authService.validateUserJwt(
      payload.email,
      payload.id,
    );
    console.log('user', user);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
