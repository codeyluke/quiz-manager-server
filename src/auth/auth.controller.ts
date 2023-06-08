import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RegisterUserDto } from 'src/user/dto/register-user.req.dto';
import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(@Request() req: any) {
    return await this.authService.login(req.user);
  }

  @Post('register')
  @HttpCode(200)
  async register(@Body() data: RegisterUserDto) {
    return await this.authService.register(data);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  @HttpCode(200)
  async refreshToken(@Request() req: any) {
    return this.authService.refreshToken(req.user);
  }
}
