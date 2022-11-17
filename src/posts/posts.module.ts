import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from 'src/entities';
import { PostsController } from './posts.controller';
import { PostsQueryBuilder } from './queryFilters/posts.queryBuilder';
import { PostsService } from './posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Posts])],
  controllers: [PostsController],
  providers: [PostsService, PostsQueryBuilder],
})
export class PostsModule {}
