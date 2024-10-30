import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Role } from "../../enum/role";
import { Report } from "./report.entity";
import { Discussion } from "./discussion";  // Importing Discussion entity
import { Comment } from "./comment";  // Importing Comment entity

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  cedula!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  password!: string;

  @Column()
  role!: Role;

  @OneToMany(() => Report, (report) => report.user)
  reports!: Report[];

  // Relation to discussions
  @OneToMany(() => Discussion, (discussion) => discussion.createdBy)
  discussions!: Discussion[];

  // Relation to comments
  @OneToMany(() => Comment, (comment) => comment.createdBy)
  comments!: Comment[];
}
