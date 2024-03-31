import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
// import { AppService } from './app.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, UserModel } from './entity/user.entity';
import { Repository } from 'typeorm';
import { ProfileModel } from './entity/profile.entity';
import { PostModel } from './entity/post.entity';
import { TagModel } from './entity/tag.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,
    @InjectRepository(TagModel)
    private readonly tagRepository: Repository<TagModel>,
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
        posts: true,
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

  @Post('user/post')
  async createUserAndPosts() {
    const user = await this.userRepository.save({
      email: 'esy@esy.co.kr',
    });

    await this.postRepository.save({
      author: user,
      title: 'post1',
    });

    await this.postRepository.save({
      author: user,
      title: 'post2',
    });

    return user;
  }

  /**
   * many-to-many 생성 실습
   */
  @Post('posts/tags')
  async createPosts() {
    const post1 = await this.postRepository.save({
      title: 'AWS Cloud',
    });

    const post2 = await this.postRepository.save({
      title: 'docker practice',
    });

    const tag1 = await this.tagRepository.save({
      name: 'CI/CD',
      posts: [post1, post2],
    });

    const tag2 = await this.tagRepository.save({
      name: 'cloudfront',
      posts: [post1],
    });

    const tag3 = await this.tagRepository.save({
      name: 'typescript',
      posts: [],
    });

    const post3 = await this.postRepository.save({
      title: 'NESTJS',
      tags: [tag3],
    });
    return true;
  }

  @Get('posts')
  getPosts() {
    return this.postRepository.find({
      relations: {
        tags: true,
      },
    });
  }

  @Get('tags')
  getTags() {
    return this.tagRepository.find({
      relations: {
        posts: true,
      },
    });
  }
}
