import { Module } from '@nestjs/common';
import { QuizModule } from './quiz/quiz.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from 'src/config/typeorm.config';
import { QuestionModule } from './question/question.module';
import { OptionModule } from './option/option.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    RouterModule.register([
      {
        path: 'private',
        children: [
          {
            path: 'v1',
            children: [
              {
                path: 'quizes',
                module: QuizModule,
                children: [
                  {
                    path: ':quiz_id/questions',
                    module: QuestionModule,
                    children: [
                      {
                        path: ':question_id/options',
                        module: OptionModule,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ]),
    QuizModule,
    QuestionModule,
    OptionModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
