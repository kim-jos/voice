import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseCommonEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
