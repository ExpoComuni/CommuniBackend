import { Entity, ObjectIdColumn, ObjectId, Column } from "typeorm";
import { IsEnum } from "class-validator";
import { NewsTags } from "@/enum/newsTags";

@Entity()
export class News {
  @ObjectIdColumn()
  id!: ObjectId;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @Column()
  author!: string;

  @Column({ type: "date" })
  publishedDate!: Date;

  @Column()
  img!: string;

  @Column("array")
  @IsEnum(NewsTags, { each: true })
  newsTags!: NewsTags[];
}
