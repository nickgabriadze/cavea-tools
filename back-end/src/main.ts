import express from "express";
import cors from "cors";

export const server = express();
server.use(cors())
server.use(express.json())



server.listen(3001, () => {
    console.log("up and running")
})