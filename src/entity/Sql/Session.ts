import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class Session {
  @PrimaryGeneratedColumn("uuid")
  id!: string; // Non-null assertion to tell TypeScript that this will be handled by TypeORM

  @Column({ unique: true })
  jwt!: string; // Non-null assertion
}
