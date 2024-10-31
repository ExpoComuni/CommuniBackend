import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
//.env configuration
dotenv.config();

const mongoUrl = process.env.mongoDB;
console.log(mongoUrl)

const MongoDataSource = new DataSource({
  type: "mongodb",
  url: mongoUrl,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  entities: ["src/entity/MongoDB/*.js"],
  synchronize: true,
  logging: false,
});

export default MongoDataSource