import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class UserModel {
  // ORM PK 값을 넣어줄 떄, 1,2,3... 이아니라 uuid 속성을 defualt 로 삽입 가능
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

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
}
