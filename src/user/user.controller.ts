import { Controller, Get, Req, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('/')
  index(@Req() req: Request) {
    return this.userService.findOneWithId(req['user'].sub);
  }
}
