import { Request, Response } from "express";
const fs = require("fs");
const { v4: uuid } = require("uuid");

const addRecord = async (req: Request, res: Response) => {
  try {
    const data = fs.readFileSync("./data/record.json");
    const allRecord = JSON.parse(data);
    if (req.body instanceof Array) {
      let paramsData = req.body;
      paramsData.forEach(function (animal) {
        const newAnimal = {
          id: uuid(),
          color: animal.color,
          animal: animal.animal,
        };
        allRecord.push(newAnimal);
      });
    } else {
      const color = req.body.color;
      const animal = req.body.animal;

      if (!color || color == "") {
        return res.status(400).send("No color name provided.");
      }

      if (!animal || animal == "") {
        return res.status(400).send("No animal name provided.");
      }

      const newAnimal = {
        id: uuid(),
        color: color,
        animal: animal,
      };

      allRecord.push(newAnimal);
    }

    let newSetRecord = JSON.stringify(allRecord, null, 2); //readable format

    await fs.writeFile("./data/record.json", newSetRecord, (error: Error) => {
      if (error) throw error;
      res.status(201).send("New records added.");
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const updateRecord = async (req: Request, res: Response) => {
  try {
    let recordID = req.params.id;
    if (!recordID) return res.status(400).send("No ID provided.");

    const data = fs.readFileSync("./data/record.json");
    const allRecord = JSON.parse(data);

    allRecord.forEach(function (record: any, index: Number) {
      if (record.id === recordID) {
        record.color = req.body.color ? req.body.color : record.color;
        record.animal = req.body.animal ? req.body.animal : record.animal;
      }
    });

    let updatedRecord = JSON.stringify(allRecord, null, 2); //readable format

    await fs.writeFile("./data/record.json", updatedRecord, (error: Error) => {
      if (error) throw error;
      res.status(204).send("Record Updated.");
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const deleteRecord = async (req: Request, res: Response) => {
  try {
    let recordID = req.params.id;
    if (!recordID) return res.status(400).send("No ID provided.");

    const data = fs.readFileSync("./data/record.json");
    const allRecord = JSON.parse(data);

    const checkIfIDExists = allRecord.findIndex(
      (record: any) => record.id === recordID
    );

    if (checkIfIDExists === -1)
      return res.status(400).send("ID no longer exists");

    const filterRecord = allRecord.filter(
      (record: any) => record.id != recordID
    );

    let updatedRecord = JSON.stringify(filterRecord, null, 2); //readable format

    await fs.writeFile("./data/record.json", updatedRecord, (error: Error) => {
      if (error) throw error;
      res.status(204).send("Record Updated.");
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  addRecord,
  updateRecord,
  deleteRecord,
};
