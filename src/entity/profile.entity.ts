import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserModel } from './user.entity';

@Entity()
export class ProfileModel {
  @PrimaryGeneratedColumn()
  id: number;

  // user entity의 profile 데이터를 연결
  @OneToOne(() => UserModel, (user) => user.profile)
  @JoinColumn()
  user: UserModel;

  @Column()
  profileImg: string;
}
