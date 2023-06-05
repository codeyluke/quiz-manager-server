import { Question } from 'src/question/question.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('options')
export class Option extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  is_correct: boolean;

  @ManyToOne(() => Question, (question) => question.options)
  question: Question;
}
