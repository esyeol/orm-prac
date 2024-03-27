import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// 중첩되는 항목에 대해서 Entitiy Embedding 형식으로 중복된 컬럼을 처리
export class Name {
  @Column()
  first: string;

  @Column()
  last: string;
}

@Entity()
export class StudentModel {
  @PrimaryGeneratedColumn()
  id: number;
  //   @Column()
  //   firstName: string;
  //   @Column()
  //   lastName: string;
  @Column(() => Name)
  name: Name;

  @Column()
  class: string;
}

@Entity()
export class TeacherModel {
  @PrimaryGeneratedColumn()
  id: number;
  //   @Column()
  //   firstName: string;
  //   @Column()
  //   lastName: string;
  @Column(() => Name)
  name: Name;
  @Column()
  salary: number;
}
