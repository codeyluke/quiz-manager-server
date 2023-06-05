import { Module } from '@nestjs/common';
import { QuizModule } from './quiz/quiz.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'config/typeorm.config';
import { QuestionModule } from './question/question.module';
import { OptionModule } from './option/option.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    QuizModule,
    QuestionModule,
    OptionModule,
  ],
})
export class AppModule {}
