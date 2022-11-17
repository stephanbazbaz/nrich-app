import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Response } from 'express';
import { CreatePostsDto } from './Dto/posts.dtos';
import { PostsInterface } from './interfaces/postsInterfaces';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Post('/createNewPost')
  async createPost(
    @Body() createPostsDto: CreatePostsDto,
    @Res() res: Response,
  ) {
    const response = await this.postsService.createPost(createPostsDto);
    res.json({ status: HttpStatus.CREATED, response });
  }
  @Get('/publishPost/:postId')
  async publishPost(
    @Param('postId', ParseIntPipe) postId: string,
    @Res() res: Response,
  ) {
    const response = await this.postsService.publishPost(postId as any);
    res.json({ status: HttpStatus.OK, response });
  }

  @Post('/updatePost')
  async updatePost(@Body() body: PostsInterface, @Res() res: Response) {
    const response = await this.postsService.editPost(body);
    res.json({ status: HttpStatus.OK, response });
  }

  @Get('/deletePost/:postId')
  async deletePost(
    @Param('postId', ParseIntPipe) postId: string,
    @Res() res: Response,
  ) {
    const response = await this.postsService.deletePost(postId as any);
    res.json({ status: HttpStatus.OK, response });
  }

  @Post('/getPosts')
  async getPosts(@Body() body: any, @Res() res: Response) {
    const response = await this.postsService.getPosts(body);
    res.json({ status: HttpStatus.OK, response });
  }

  @Get('/confirmPostsAfterReview/:postId')
  async confirmReviewPost(
    @Param('postId', ParseIntPipe) postId: number,
    @Res() res: Response,
  ) {
    const response = await this.postsService.confirmPostsAfterReview(postId);
    res.json({ status: HttpStatus.OK, response });
  }
}
