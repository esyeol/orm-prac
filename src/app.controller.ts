import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
// import { AppService } from './app.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './entity/user.entity';
import { ILike, LessThan, Repository } from 'typeorm';
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
  async createUser() {
    for (let i = 0; i < 100; i++) {
      await this.userRepository.save({
        email: `user-${i}@google.com`,
      });
    }
    // return this.userRepository.save({
    //   role: Role.ADMIN,
    // });
  }

  @Post('sample')
  async sample() {
    // // 모델에 해당하는 객체 생성 -> 저장X
    // const user1 = await this.userRepository.create({
    //   email: 'test@test.test',
    // });
    // // 실제 생성 및 저장
    // const user2 = await this.userRepository.save({
    //   email: 'test@test.test',
    // });
    //   // preload
    //   // 입력된 값을 기반으로 데이터 베이스에 있는 데이터 호출하고
    //   // 추가 입력된 값으로 데이터베이스에서 가져온 값들을 대체
    //   // 값을 실제로 저장 X
    //   const user3 = await this.userRepository.preload({
    //     id: 100,
    //     email: 'test3@test.test',
    //   });
    //   return user3;
    // }
    // // 제거
    // await this.userRepository.delete(101);
    // // incremnt => 특정 조건에 해당하는 값의 속성을 N 만큼 증가
    // await this.userRepository.increment(
    //   {
    //     id: 2,
    //   },
    //   'count',
    //   2,
    // );
    // // decrement => 특정 조건에 해당하는 값의 속성을 N 만큼 감소
    // await this.userRepository.decrement(
    //   {
    //     id: 1,
    //   },
    //   'count',
    //   1,
    // );
    // // count() 갯수 카운팅
    // const count = await this.userRepository.count({
    //   where: {
    //     email: ILike('%0%'),
    //   },
    // });
    // // sum
    // const sum = await this.userRepository.sum('count', {
    //   email: ILike('%0%'),
    // });
    // // avgerage
    // const avg = await this.userRepository.average('count', {
    //   id: LessThan(4),
    // });
    // // minimum
    // const min = await this.userRepository.minimum('count', {
    //   id: LessThan(4),
    // });
    // // maximum
    // const max = await this.userRepository.maximum('count', {
    //   id: LessThan(4),
    // });
    // // take 갯수만큼 찾고 전체 갯수를 조회
    // const usersAndCount = await this.userRepository.findAndCount({
    //   take: 3,
    // });
    // return usersAndCount;
  }

  @Get('users')
  getUsers() {
    // userEntity에서 profile 테이블의 eager 속성이 true일 경우
    // one-to-one 상태에서 값을 default로 가져올 수 있음 별도의 realation 속성 작성 X
    return this.userRepository.find({
      /**
       * 원하는 프로퍼티를 가져올 수 있도록 지정하는 옵션
       * SQL 쿼리에서 가져오고자 하는 옵션값을 지정하는거랑 동일함
       * default => *
       */
      // select: {
      //   id: true,
      //   version: true,
      //   createdAt: true,
      //   updatedAt: true,
      //   profile: {
      //     id: true,
      //   },
      // },
      /**
       * 걍 SQL where 절이랑 동일
       * 단, Where 의 프로퍼티가 객체일경우 AND 조건으로 조회해서 가져옴
       * OR 조건으로 조회하고 싶으면 프로퍼티를 리스트로 변경 해야함
       * */
      /**AND 조건 */
      // where: {
      //   id: 3,
      //   veresion: 1,
      // },
      // /**OR 조건으로 조회시 다음과 같이 조회 id가 3이거나 verison 1인 케이스를 조회*/
      // where: [
      //   {
      //     id: 3,
      //   },
      //   {
      //     version: 1,
      //   },
      // ],
      /** 필터링 조건에 relation 을 기반으로 조회 가능 */
      // where: {
      //   profile: {
      //     id: 3,
      //   },
      // },

      where: {
        /**
         * NOT() 특정 속성값이 아닌 경우에가져올 경우
         * id: Not(1), => id가 1 인 값을 제외
         *
         * LessThan() 적은 경우 조회
         * LessThan(30) => 1 ~ 29 조회
         *
         * LessThanOrEqual() 적거나 같은 경우
         * LessThanOrEqual(30) => 1 ~ 30 조회
         *
         * MoreThan() 특정 값 이상 조회
         * MoreThan(30) 30 이후의 값 조회 (31 ~ N)
         *
         * MoreThanOrEqual() 특정 값 포함 조회
         * MoreThanOrEqual(30) 30 포함 이후의 값 조회 (30 ~ N)
         *
         * Like() 일반 SQL like 절과 동일함 => 대소문자 구분
         * LIKE(%N%)
         *
         * ILIKE() LIKE와 동일하나 대소문자 구분 X
         * ILIKE(%N%)
         *
         * Between() 사이값을 조회 할 수 있음
         * Between(10, 15)
         *
         * IN() => 포함된 값들을 조회
         * IN([N,N+1, N+3....])
         *
         * ISNULL() NULL인 경우 조회
         */

        id: LessThan(30),
      },

      /**관계된 프로퍼티를 포함해서 조회*/
      // relations: {
      //   profile: true,
      // },
      /** 정렬 ASC, DESC */
      order: {
        id: 'ASC',
      },
      /**처음 N개를 제외할지 정렬한 이후 입력한 N개를 제외한 데이터를 조회 가능( Default 0)*/
      // skip: 0,
      /**
       * N개를 가져올지 조회
       * Default 0
       * 실제 가지고 있는 데이터의 갯수보다 크게 입력하면 그 크기만큼만 조회해서 가져옴
       * */
      // take: 6,
    });

    // /**
    //  * user 조회시 user entity와 one-to-one 인 profile entity를 가져오기 위한 속성
    //  * SQL Join 유사함
    //  * */
    // return this.userRepository.find({
    //   relations: {
    //     profile: true,
    //     posts: true,
    //   },
    // });

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
      email: user.email + '0',
    });
  }

  @Delete('user/profile/:id')
  async deleteProfile(@Param('id') id: string) {
    await this.profileRepository.delete(+id);
  }

  @Post('user/profile')
  async createUserAndProfile() {
    // 유저 생성
    const user = await this.userRepository.save({
      email: 'kkk@naver.com',
      profile: {
        /**
         * user entity에서 cascade의 값이 true로 설정되어 있는경우
         * 아래처럼 별도로 profile 생성시 값을 넣어주는게 아니라 한번에 넣어줄 수 있음.
         */
        profileImg: 'sss.png',
      },
    });

    // // profile 생성
    // const profile = await this.profileRepository.save({
    //   profileImg: 'sss.png',
    //   user,
    // });

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
