import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserModel } from './user.entity';
import { TagModel } from './tag.entity';

@Entity()
export class PostModel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserModel, (user) => user.posts)
  author: UserModel;

  /**
   * tagsModle 과 다대다 관계를 가지기 때문에 다음과 같이지정
   * TagModel & PostModel이 many-to-many를 가질 때 orm에 두 모델중
   * JoinTable 어노테이션을 별도로 넣어주어야함, 이때 post_model_tag라는 테이블이 생성
   * 해당 테이블은 post PK, tag PK 값을 가지며 두 관계를 many-to-many 형식으로 매핑시키는 역할을 수행
   */
  @ManyToMany(() => TagModel, (tag) => tag.posts)
  @JoinTable()
  tags: TagModel[];

  @Column()
  title: string;
}
