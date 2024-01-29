import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";
import Recipe from "./model/recipeschema.js";
import csvtojson from "csvtojson";
import Admin from "./routes/admin.js";
import User from "./routes/user.js";
import { importData } from "./controller/data.js";
// const recipe = require("./recipes.json");

// const data = JSON.parse(fs.readFileSync("./freelancer.json", "utf-8"));

// console.log(data);

const app = express();
dotenv.config();

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
// app.use("/uploads", express.static("uploads"));
//example url
// http://localhost:8800/uploads\Mon Dec 26 2022-1779929.jpg
// uploads\Mon Dec 26 2022-1779929.jpg

//DB
// , {
//       connectTimeoutMS: 1000,
//       // Note that mongoose will **not** pull `bufferCommands` from the query string
//     }
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
  } catch (err) {
    console.log(err);
  }
};
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

//api
app.use(express.json());

//it allows us to relax the security applied to an API.
app.use(cors({ credentials: true, origin: true }));

// importData(); for upload data to Db from ./controller/data.js
app.use("/", User);
app.use("/admin", Admin);

app.listen(8800, () => {
  connect();
  console.log("Yeah I'm On The Strike");
});
