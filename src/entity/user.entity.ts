import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { ProfileModel } from './profile.entity';
import { PostModel } from './post.entity';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class UserModel {
  // ORM PK 값을 넣어줄 떄, 1,2,3... 이아니라 uuid 속성을 defualt 로 삽입 가능
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  // @Column({
  //   // 각 컬럼의 타입 정의가능
  //   type: 'varchar',
  //   // 프로퍼티 이름이 자동 유추됨
  //   // 보통 코드단에서 camel case 컬러명은 snake case로 작성할 때, 활용하면 유용
  //   name: 'title',
  //   // 길이지정
  //   length: 200,
  //   // nullish 허용 여부
  //   nullable: false,
  //   // true일 경우 처음 저장할 때만 값 지정 가능
  //   // 이후 변경 X
  //   update: true,
  //   // default -> true
  //   // find 함수를 수행할 때 option이 False일 경우 값 안 불러옴
  //   select: false,
  //   // default value
  //   default: 'default',
  //   // unique 설정
  //   unique: false,
  // })
  // title: string;

  @Column({
    // column 속성으로 enum을 지정할 때 다음과 같이 처리할 수 있음.
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 데이터 업데이트시 값 1씩 추가 => default 1
  @VersionColumn()
  version: number;

  /**
   * PK 가 아닌 row에 자동으로 1씩 추가
   * Generated 옵션은 별도로 Column 과 함께 사용
   * */
  @Column()
  @Generated('increment')
  additionalId: number;

  @OneToOne(() => ProfileModel, (profile) => profile.user, {
    // find 실행시 항상 같이 가져올 Relation
    eager: false, // default false
    // 값 저장시 realation을 한번에 저장
    cascade: true, // default false,
    // null 여부 체크
    nullable: true, // default true
    // 관계 삭제시
    // no action => 아무런 반응 X
    // cascade => 참조하는 Row도 같이 삭제
    // set null => 참조하는 Row에서 참조 id를 null로 변경
    // set default => 기본 세팅으로 설정 (테이블의 기본 세팅)
    // restrict => 참조하고 있는 Row가 있는 경우 참조당하는 Row는 삭제 X
    onDelete: 'RESTRICT',
  })
  profile: ProfileModel;

  @OneToMany(() => PostModel, (post) => post.author)
  posts: PostModel[];
}
