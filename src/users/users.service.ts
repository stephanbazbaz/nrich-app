import { Injectable } from '@nestjs/common';
import { User } from '../entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInterface } from './interfaces/userInterface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RESPONSE_MESSAGES } from 'src/utils/constants';
import { CreateUserDto } from './Dto/users.dtos';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtTokenService: JwtService,
  ) {}
  async registerUser(createUserDto: CreateUserDto) {
    const { userName, password, email } = createUserDto;
    const hash = bcrypt.hashSync(password, 10);
    createUserDto.password = hash;
    try {
      const isUserAvailable = await this.userRepository.findOne({
        where: { email },
      });
      if (isUserAvailable) {
        return {
          msg: RESPONSE_MESSAGES.EMAIL_EXISTS,
          success: false,
        };
      }
      const newUser = this.userRepository.create({ ...createUserDto });
      this.userRepository.save(newUser);
      return {
        newUser,
        accessToken: this.jwtTokenService.sign(userName),
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async userLogin(body: UserInterface) {
    const { email, password } = body;
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      return {
        success: false,
        msg: RESPONSE_MESSAGES.PASSWORD_NOMATCH,
      };
    }
    return {
      success: true,
      token: this.jwtTokenService.sign(user.userName),
    };
  }
}
