import * as dotenv from "dotenv";
import { DataSource } from "typeorm";

dotenv.config();

const mongoUrl = process.env.mongoDB;

const MongoDataSource = new DataSource({
  type: "mongodb",
  url: mongoUrl,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  entities: ["src/entity/MongoDB/*.ts"],
  synchronize: true,
  logging: false,
});

export default MongoDataSource