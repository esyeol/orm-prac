import {
  ChildEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn,
} from 'typeorm';

export class BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}

// 공통 분모(BaseModel)을 상속 받아서 테이블 생성 가능

@Entity()
export class BookModel extends BaseModel {
  @Column()
  name: string;
}

@Entity()
export class CarModel extends BaseModel {
  @Column()
  brand: string;
}

/**
 * TableInheritance 적용시 SingleBaseModel 테이블의 하위 값들이 들어감
 * TableInheritance 데코레이터를 적용하면 싱글 테이블 패턴형식으로 테이블을 구성할 수 있음
 * 부모 클래스의 SingleBaseModel에서 type 속성을 가지고 자식 클래스를 분류
 * 이때 자식 클래스는 childEntity 어노테이션과 SingleBaseModel을 상속받고 있는 상태여야함.
 */

@Entity()
@TableInheritance({
  column: {
    name: 'type',
    type: 'varchar',
  },
})
export class SingleBaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@ChildEntity()
export class ComputerModel extends SingleBaseModel {
  @Column()
  brand: string;
}

@ChildEntity()
export class AirplaneModel extends SingleBaseModel {
  @Column()
  counyry: string;
}
