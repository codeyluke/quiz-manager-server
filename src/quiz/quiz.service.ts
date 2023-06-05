import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from './quiz.entity';
import { Repository } from 'typeorm';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Injectable()
export class QuizService {
  constructor(@InjectRepository(Quiz) private repo: Repository<Quiz>) {}

  async index(): Promise<Quiz[]> {
    return await this.repo
      .createQueryBuilder('q')
      .leftJoinAndSelect('q.questions', 'qt')
      .getMany();
  }

  async create(data: CreateQuizDto): Promise<Quiz> {
    return await this.repo.save(data);
  }

  async findById(id: number): Promise<Quiz> {
    return await this.repo.findOne({
      where: { id },
      relations: ['questions', 'questions.options'],
    });
  }
}
