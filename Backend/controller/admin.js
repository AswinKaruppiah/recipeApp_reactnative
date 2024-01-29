import Recipe from "../model/recipeschema.js";
import fs from "fs";
import { convertArrayToCSV } from "convert-array-to-csv";
import json2csv from "json2csv";
import path from "path";
import { fileURLToPath } from "url";
import Diet from "../model/dietschema.js";
import { log } from "console";
import { check } from "./data.js";
import e from "express";

export const createrecipe = async (req, res) => {
  const newRecipe = new Recipe(req.body);

  try {
    const find = await Recipe.findOne({ name: req.body.name });

    if (find) {
      res.status(200).json("already exist");
    } else {
      const savedRecipe = await newRecipe.save();

      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const write = async (fileName, data) => {
        // output file in the same folder
        const filename = path.join(__dirname, `${fileName}`);

        let rows;

        // Rows without headers.
        rows = json2csv.parse(data, { header: false });

        // Append file function can create new file too.
        fs.appendFileSync(filename, rows);
        // Always add new line if file already exists.
        fs.appendFileSync(filename, "\r\n");
      };

      await write("../Food_Recipe.csv", req.body);
      res.status(200).json(savedRecipe);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get all
export const getall = async (req, res) => {
  // countDocuments
  // const recipe = await Recipe.find().countDocuments();

  // limit
  // const recipe = await Recipe.find().limit(20);

  try {
    const recipe = await Recipe.find()
      .skip(req.params.page * 20 - 20)
      .limit(20);
    // console.log(recipe.diet);
    res.status(200).json(recipe);
    // var size = Recipe.collection.count();
    // console.log(recipe);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const navsupload = async (req, res) => {
  try {
    const recipe = await Recipe.find();
    await recipe.forEach(async (data, index) => {
      await check(data, index);
    });
    res.status(200).json("successfully Done");
  } catch (err) {
    res.status(500).json(err);
  }
};

export const navs = async (req, res) => {
  function ReadJson(path) {
    const jsonTxt = fs.readFileSync(path);
    const jsonobj = JSON.parse(jsonTxt);
    return jsonobj;
  }
  var list = ReadJson("./nav.json");
  try {
    list.forEach(async (data, index) => {
      const newNav = new Diet(data);
      if (!data.name) {
        return "no data";
      } else {
        const find = await Diet.findOne({ name: data.name });
        if (find) {
          return "already exist";
        } else {
          const savedNav = await newNav.save();
        }
      }
    });
    res.status(200).json("upload successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};
export const navadd = async (req, res) => {
  const newNav = new Diet(req.body);
  try {
    const savedNav = await newNav.save();
    res.status(200).json(savedNav);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get all for types
export const cuisine = async (req, res) => {
  try {
    const recipe = await Recipe.find({ cuisine: req.params.cuisine });
    res.status(200).json(recipe);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const course = async (req, res) => {
  try {
    const recipe = await Recipe.find({ course: req.params.course });
    res.status(200).json(recipe);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const diet = async (req, res) => {
  try {
    const recipe = await Recipe.find({ diet: req.params.diet });
    res.status(200).json(recipe);
  } catch (err) {
    res.status(500).json(err);
  }
};

//update
export const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json("updated successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};

//delete
export const deleterecipe = async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.status(200).json("deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};
