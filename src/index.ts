import express from "express";
import { config } from "dotenv";
import SQLDataSource from "./config/NeonDataSource";
import MongoDataSource from "./config/MongoDataSource";
import routes from "@/routes";
import "reflect-metadata";
import 'tsconfig-paths/register';
import cors from "cors";  // Importa cors
config();


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({limit: '50mb'})); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use("/", async (req, res) => {
  res.json({msg:"hello world"})
})


// Initialize SQL Database
SQLDataSource.initialize()
  .then(() => {
    console.log("Connection established with the SQL database");

    // Initialize MongoDB if needed
    MongoDataSource.initialize()
      .then(() => {
        console.log("Connection established with the MongoDB database");
      })
      .catch((error: any) => console.error("Error connecting to MongoDB:", error));

    // Set up routes dynamically using the route configuration
    routes.map((route) => {
      app.use(route.path, route.router);
    });

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error: any) => console.error("Error connecting to SQL:", error));
