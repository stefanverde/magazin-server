import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('simple-json', { nullable: false })
  items: any[];

  @Column('decimal')
  pretTotal: number;
}
