import * as dotenv from "dotenv";
import { DataSource } from "typeorm";

dotenv.config();

const url = process.env.neonDB;

const SQLDataSource = new DataSource({
  type: "postgres",
  url: url,
  entities: ["src/entity/Sql/*.ts"],
  synchronize: true,
  logging: false,
});

export default SQLDataSource;