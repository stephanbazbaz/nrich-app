import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PostsInterface } from '../posts/interfaces/postsInterfaces';
import { POST_STATUSES } from 'src/utils/constants';

@Entity()
export class Posts implements PostsInterface {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'postId',
  })
  postId: number;

  @Column({
    nullable: false,
  })
  title: string;

  @Column({
    nullable: false,
  })
  content: string;

  @Column({
    nullable: false,
  })
  userId: string;

  @Column({
    nullable: true,
    default: POST_STATUSES.DRAFTED,
  })
  status: string;
  @Column({
    nullable: true,
    default: false,
  })
  isDeleted: boolean;
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;
}
