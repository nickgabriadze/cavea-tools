import express from "express";
import cors from "cors";
import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";
import { generateDataInBulk } from "./generateBulkTools";
export const server = express();

server.use(cors());
server.use(express.json());
dotenv.config();
const sequalize = new Sequelize(
  "cavetools",
  "postgres",
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
  }
);

const testDbConnection = async () => {
  try {
    await sequalize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.log(error);
  }
};

testDbConnection();

const Inventory = sequalize.define(
  "Inventory",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    itemName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    itemLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    itemPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

const insertBulk = () => {
  Inventory.findAll({ raw: true }).then((data) => {
    if (data.length < 300000) {
      Inventory.bulkCreate(generateDataInBulk());
    }
  });
};

insertBulk();

server.get("/inventories", async (_, res) => {
  try {
    const data = await Inventory.findAll({ raw: true, order: ['itemName']});
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

server.delete("/inventories/:inventoryID", async (req, res) => {
  try {
    const itemID = req.params.inventoryID;
    Inventory.destroy({
      where: {
        id: itemID,
      },
    }).then((response) => {
      console.log(response);
      res.sendStatus(200);
    });
  } catch (err) {
    console.log(err);
  }
});

server.post("/inventories", async (req, res) => {
  try {
   
    const { place, name, price } = req.body;
    Inventory.create({
      itemName: name,
      itemLocation: place,
      itemPrice: price,
    }).then(() => {
      res.sendStatus(200);
    });
  } catch (err) {
    console.log(err);
  }
});

server.listen(3001, () => {
  console.log("up and running");
});
