import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.req.dto';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(data: RegisterUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(data.password, salt);
    return await this.repo.save({
      name: data.name,
      password: password,
      email: data.email,
    });
  }

  async findOneWithUsername(username: string): Promise<User> {
    return await this.repo.findOne({ where: { email: username } });
  }
}
