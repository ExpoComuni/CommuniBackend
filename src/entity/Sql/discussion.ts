import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from "typeorm";
import { User } from "./User";
import { Comment } from "./comment";
import { DiscussionTopics } from "../../enum/discussion";

@Entity()
export class Discussion {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @Column({ type: "enum", enum: DiscussionTopics })
  topic!: DiscussionTopics;  // Using the enum for topics

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  // Many discussions can be created by one user
  @ManyToOne(() => User, (user) => user.discussions)
  createdBy!: User;

  // One discussion can have many comments
  @OneToMany(() => Comment, (comment) => comment.discussion)
  comments!: Comment[];
}
