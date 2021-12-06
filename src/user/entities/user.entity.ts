import { BaseCommonEntity } from 'src/common/base-common.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends BaseCommonEntity {
  @Column()
  email: string;

  @Column()
  password: string;
}
