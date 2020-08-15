import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import { router } from "./routes";
import "dotenv/config";

const app = express();

createConnection()
  .then(async (connection) => {
    console.log("DB Connect");
  })
  .catch((error) => console.log(error));

app.use(express.json());
app.use(router);

export { app };
