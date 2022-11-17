import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from 'src/entities';
import { POST_STATUSES } from 'src/utils/constants';
import { Repository } from 'typeorm';

export class PostsQueryBuilder {
  constructor(
    @InjectRepository(Posts)
    private readonly postsRepository: Repository<Posts>,
  ) {}

  getAllPostsQuery(from: number) {
    const query = this.postsRepository.createQueryBuilder('posts');
    return query
      .where('posts.isDeleted = :isDeleted', { isDeleted: false })
      .andWhere('posts.status = :status', { status: POST_STATUSES.PUBLISHED })
      .orderBy('posts.postId', 'DESC')
      .skip(from)
      .take(10)
      .getMany();
  }
  getAllPostsByUserQuery(from: number, userId: number) {
    const query = this.postsRepository.createQueryBuilder('posts');
    return query
      .where('posts.isDeleted = :isDeleted', { isDeleted: false })
      .andWhere('posts.status = :status', { status: POST_STATUSES.PUBLISHED })
      .andWhere('posts.userId = :userId', { userId: userId })
      .orderBy('posts.postId', 'DESC')
      .skip(from)
      .take(10)
      .getMany();
  }
}
