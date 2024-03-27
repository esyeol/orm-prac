import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
// import { AppService } from './app.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, UserModel } from './entity/user.entity';
import { Repository } from 'typeorm';
import { ProfileModel } from './entity/profile.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
  ) {}

  @Post('users')
  createUser() {
    return this.userRepository.save({
      role: Role.ADMIN,
    });
  }

  @Get('users')
  getUsers() {
    /**
     * user 조회시 user entity와 one-to-one 인 profile entity를 가져오기 위한 속성
     * SQL Join 유사함
     * */
    return this.userRepository.find({
      relations: {
        profile: true,
      },
    });

    // entity 의 select 속성이 false일 경우 find에 select 조건으로 원하는 row 조회
    // return this.userRepository.find({
    //   select: {
    //     id: true,
    //     title: true,
    //   },
    // });
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
      // title: user.title + '0',
    });
  }

  @Post('user/profile')
  async createUserAndProfile() {
    // 유저 생성
    const user = await this.userRepository.save({
      email: 'kkk@naver.com',
    });

    // profile 생성
    const profile = await this.profileRepository.save({
      profileImg: 'sss.png',
      user,
    });

    return user;
  }
}
