import { Entity, ObjectIdColumn, ObjectId, Column } from "typeorm";

@Entity()
export class Event {
  @ObjectIdColumn()
  id!: ObjectId;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  eventdate!: Date;

  @Column()
  hour!: string;

  @Column()
  place!: string;

  @Column()
  audience!: string;

  @Column("array")
  requirements!: string[];

  @Column()
  link!: string;
}
