import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Discussion } from "./discussion";
import { User } from "./User";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id!: string; // Automatically generated UUID

  @Column()
  content!: string; // The actual comment content
  
  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @ManyToOne(() => Discussion, (discussion) => discussion.comments)
  discussion!: Discussion; // Reference to the discussion the comment belongs to

  @ManyToOne(() => User)
  createdBy!: User; // Reference to the user who made the comment

  
}
