import { Request, Response } from "express";
const express = require("express");
const routes = express.Router();
const _ = require("lodash");
const { v4: uuid } = require("uuid");
const fs = require("fs");

const { addRecord, updateRecord, deleteRecord } = require("../src/controllers");

routes.get("/", (req: Request, res: Response) => {
  return res.status(200).send("Server is now running...");
});

routes.get("/list", (req: Request, res: Response) => {
  const data = fs.readFileSync("./data/record.json");
  const records = JSON.parse(data);
  res.json(records);
});

routes.get("/random", (req: Request, res: Response) => {
  const data = fs.readFileSync("./data/record.json");
  const records = JSON.parse(data);
  res.json(_.sample(records));
});

routes.post("/add-list", addRecord);

routes.put("/update/:id", updateRecord);

routes.delete("/remove/:id", deleteRecord);

routes.use((req: Request, res: Response) => {
  const error = new Error("Not found!");
  return res.status(404).json({
    message: error.message,
  });
});

module.exports = routes;
