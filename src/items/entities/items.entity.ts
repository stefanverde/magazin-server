import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
  } from 'typeorm';
  
  @Entity()
  export class Item {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    role: string;

    @Column({ nullable: false, unique: true })
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
  }
  