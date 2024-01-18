import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: `${process.env.SECRET_KEY}`,
    });
  }

  async validate(payload: any) {
    const { username } = payload;
    const user: User = await this.userRepository.findUserByUsername(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
