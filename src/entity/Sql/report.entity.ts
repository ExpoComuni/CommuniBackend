import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ReportType } from "@/enum/reportType";
import { User } from "./User";

@Entity()
export class Report {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  location!: string;

  @Column({default:false})
  attended!: boolean;

  @Column({
    type: "enum",
    enum: ReportType,
    default: ReportType.OTRO,
    name: "report_type"
  })
  reportType!: ReportType;

  @Column()
  image!: string;

  // Relación de muchos a uno: Muchos reportes pertenecen a un usuario
  @ManyToOne(() => User, (user) => user.reports, {
    onDelete: "CASCADE" // Si un usuario es eliminado, también lo serán sus reportes
  })
  user!: User;
}
