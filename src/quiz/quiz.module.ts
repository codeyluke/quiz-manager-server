import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './quiz.entity';

@Module({
  controllers: [QuizController],
  providers: [QuizService],
  imports: [TypeOrmModule.forFeature([Quiz])],
  exports: [QuizService],
})
export class QuizModule {}
