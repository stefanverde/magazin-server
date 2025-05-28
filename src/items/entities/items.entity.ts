import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Items {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ nullable: false, unique: true })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ type: 'text', nullable: false })
  picture: string;

  @Column({ nullable: false })
  brand: string;

  @Column({ nullable: false })
  category: string;

  @Column({ nullable: false })
  sex: string;
}
