import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { News } from "../entity/MongoDB/news";
dotenv.config();

const mongoUrl = process.env.mongoDB;

const MongoDataSource = new DataSource({
  type: "mongodb",
  url: mongoUrl,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  entities: [News],
  synchronize: true,
  logging: false,
});

export default MongoDataSource;