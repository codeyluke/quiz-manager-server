import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './question.entity';
import { Repository } from 'typeorm';
import { Quiz } from 'src/quiz/quiz.entity';

@Injectable()
export class QuestionService {
  constructor(@InjectRepository(Question) private repo: Repository<Question>) {}

  async create(quiz: Quiz, data: CreateQuestionDto): Promise<Question> {
    const question = await this.repo.save({
      question: data.question,
    });
    quiz.questions = [...quiz.questions, question];
    await quiz.save();
    return question;
  }

  async findById(id: number): Promise<Question> {
    return await this.repo.findOne({
      where: { id },
      relations: ['options'],
    });
  }
}
