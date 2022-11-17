import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from '../entities';
import { Repository } from 'typeorm';
import {
  POST_STATUSES,
  RESPONSE_MESSAGES,
  offensiveWords,
} from 'src/utils/constants';
import { CreatePostsDto } from './Dto/posts.dtos';
import { PostsQueryBuilder } from './queryFilters/posts.queryBuilder';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private readonly postsRepository: Repository<Posts>,
    private readonly postsQueryBuilder: PostsQueryBuilder,
  ) {}

  async createPost(createPostsDto: CreatePostsDto) {
    try {
      const newPost = await this.postsRepository.create(createPostsDto);
      this.postsRepository.save(newPost);
      return newPost;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async confirmPostsAfterReview(postId: number) {
    try {
      await this.postsRepository.update(
        { postId: postId },
        { status: POST_STATUSES.PUBLISHED },
      );
      return {
        success: true,
        msg: RESPONSE_MESSAGES.POST_PUBLISHED,
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async reviewPost(postId: number) {
    try {
      const findPost = await this.postsRepository.findOne({
        where: { postId: postId },
      });
      const { content } = findPost;
      //Mock posts offensive words check
      if (offensiveWords.some((v) => content.includes(v))) {
        return {
          pending: true,
          msg: RESPONSE_MESSAGES.EXTRA_REVIEW,
        };
      }
      return this.confirmPostsAfterReview(postId);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  publishPost(postId: number) {
    try {
      this.postsRepository.update(
        { postId: postId },
        { status: POST_STATUSES.WAITING },
      );
      const isPublished = this.reviewPost(postId);
      return isPublished;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  editPost(body) {
    try {
      const { content, title, postId } = body;
      this.postsRepository.update(
        { postId: postId },
        { content: content, title: title },
      );
      const findPost = this.postsRepository.findOne({
        where: { postId: postId },
      });
      return findPost;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async deletePost(postId) {
    try {
      await this.postsRepository.update(
        { postId: postId },
        { isDeleted: true },
      );
      const findPost = await this.postsRepository.findOne({
        where: { postId: postId },
      });
      return findPost.isDeleted
        ? { msg: RESPONSE_MESSAGES.POST_DELETED }
        : { msg: RESPONSE_MESSAGES.ERROR_DELETING };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  getPosts(body: any) {
    try {
      const { from, userId } = body;
      if (!userId) return this.postsQueryBuilder.getAllPostsQuery(from);
      return this.postsQueryBuilder.getAllPostsByUserQuery(from, userId);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
