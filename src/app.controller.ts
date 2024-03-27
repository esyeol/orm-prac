import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
// import { AppService } from './app.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './entity/user.entity';
import { Repository } from 'typeorm';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
  ) {}

  @Post('users')
  createUser() {
    return this.userRepository.save({
      title: 'esy',
    });
  }

  @Get('users')
  getUsers() {
    // return this.userRepository.find();

    // entity 의 select 속성이 false일 경우 find에 select 조건으로 원하는 row 조회
    return this.userRepository.find({
      select: {
        id: true,
        title: true,
      },
    });
  }

  @Patch('users/:id')
  async patchUser(@Param('id') id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: parseInt(id),
      },
    });

    return this.userRepository.save({
      ...user,
      title: user.title + '0',
    });
  }
}
