import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local-strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { JwtStrategy } from './strategies/jwt-strategy';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { RefreshJwtStrategy } from './strategies/refresh-token.strategy';

config();
const configService = new ConfigService();

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy, RefreshJwtStrategy],
  controllers: [AuthController],
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: configService.get('JWT_SECRET'),
      signOptions: {
        expiresIn: configService.get('ACCESS_TOKEN_EXPIRES_IN'),
      },
    }),
  ],
})
export class AuthModule {}
