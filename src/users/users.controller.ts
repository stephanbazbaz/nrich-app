import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response, Request } from 'express';
import { CreateUserDto } from './Dto/users.dtos';
import { UserInterface } from './interfaces/userInterface';
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/register')
  async createUsers(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ) {
    const response = await this.userService.registerUser(createUserDto);
    return response.success
      ? res.json({ status: HttpStatus.CREATED, response })
      : res.json({ status: HttpStatus.NOT_ACCEPTABLE, response });
  }
  @Post('/login')
  async userLogin(@Body() body: UserInterface, @Res() res: Response) {
    const response = await this.userService.userLogin(body);
    res.json({ status: HttpStatus.OK, response });
  }
}
