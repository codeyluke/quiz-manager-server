import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
// import { config } from 'dotenv';
// import { ConfigService } from '@nestjs/config';

// config();
// const configService = new ConfigService();

type JwtPayload = {
  sub: string;
  username: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'ccc3f5e9cd431a075064d492c58b26f5',
    });
  }

  async validate(payload: JwtPayload) {
    return payload;
  }
}
