import { Module } from '@nestjs/common';
import { OptionController } from './option.controller';
import { OptionService } from './option.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from './option.entity';
import { QuestionModule } from 'src/question/question.module';
import { QuizModule } from 'src/quiz/quiz.module';

@Module({
  controllers: [OptionController],
  providers: [OptionService],
  imports: [TypeOrmModule.forFeature([Option]), QuestionModule, QuizModule],
  exports: [OptionService],
})
export class OptionModule {}
