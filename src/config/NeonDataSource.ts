import * as dotenv from "dotenv";
import { DataSource } from "typeorm";

dotenv.config();

const url = process.env.neonDB;


console.log(url)

const SQLDataSource = new DataSource({
  type: "postgres",
  url: url,
  entities: ["src/entity/Sql/*.js"],
  synchronize: true,
  logging: false,
});

export default SQLDataSource;