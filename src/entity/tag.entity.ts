import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PostModel } from './post.entity';

@Entity()
export class TagModel {
  @PrimaryGeneratedColumn()
  id: number;

  /** Tags & Posts 간의 many-to-many 관계를 형성  */
  @ManyToMany(() => PostModel, (post) => post.tags)
  posts: PostModel[];

  @Column()
  name: string;
}
