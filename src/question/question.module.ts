import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { Question } from './question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizModule } from 'src/quiz/quiz.module';

@Module({
  controllers: [QuestionController],
  providers: [QuestionService],
  imports: [TypeOrmModule.forFeature([Question]), QuizModule],
  exports: [QuestionService],
})
export class QuestionModule {}
