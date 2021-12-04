import { BaseCommonEntity } from 'src/common/base-common.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Voice extends BaseCommonEntity {
  @Column()
  model: number;

  @Column()
  text: string;

  @Column()
  audio: string;
}
