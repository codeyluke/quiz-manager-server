import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from './option.entity';
import { Repository } from 'typeorm';
import { CreateOptionDto } from './dto/create-option.dto';
import { Question } from 'src/question/question.entity';

@Injectable()
export class OptionService {
  constructor(@InjectRepository(Option) private repo: Repository<Option>) {}

  async create(question: Question, data: CreateOptionDto): Promise<Option> {
    const option = await this.repo.save(data);
    question.options = [...question.options, option];
    await question.save();
    return option;
  }
}
