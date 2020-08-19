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

app.use((req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });
  next();
});
app.use(express.json());
app.use(router);

export { app };
