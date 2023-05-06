import express from "express";
import cors from "cors";
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
export const server = express();

server.use(cors());
server.use(express.json());
dotenv.config();
const sequalized = new Sequelize("cavetools", "postgres", process.env.DB_PASSWORD, {
    host: "localhost",
    dialect: 'postgres'
});

const testDbConnection = async () => {
  try {
    await sequalized.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.log(error)
  }
};

testDbConnection();
server.listen(3001, () => {
  console.log("up and running");
});
