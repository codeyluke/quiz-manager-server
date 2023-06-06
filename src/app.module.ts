import { Module } from '@nestjs/common';
import { QuizModule } from './quiz/quiz.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from 'src/config/typeorm.config';
import { QuestionModule } from './question/question.module';
import { OptionModule } from './option/option.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    QuizModule,
    QuestionModule,
    OptionModule,
    UserModule,
  ],
})
export class AppModule {}
