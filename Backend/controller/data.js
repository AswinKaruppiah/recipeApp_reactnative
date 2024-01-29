import fs from "fs";
import csvtojson from "csvtojson";
import Recipe from "../model/recipeschema.js";

//excel

export const importData = async () => {
  csvtojson()
    .fromFile("./Food_Recipe.csv")
    .then((csvData) => {
      // console.log(csvData);
      Recipe.insertMany(csvData)
        .then(function () {
          console.log("Data inserted"); // Success
          // res.json({ success: "success" });
        })
        .catch(function (error) {
          console.log(error); // Failure
        });
    });
};

// json
//Get all navs
export const check = async (data, index) => {
  const new_nav = [{ name: data.diet, number: index + 1 }];

  function ReadJson(path) {
    const jsonTxt = fs.readFileSync(path);
    const jsonobj = JSON.parse(jsonTxt);
    return jsonobj;
  }
  function WriteJson(path) {
    var list = ReadJson("./data.json");

    const check_nav = (list) => list.name === data.diet;

    if (list.some(check_nav)) {
      return "already exist";
    } else {
      new_nav.forEach((item) => list.push(item));
      const updatedStr = JSON.stringify(list, null, 1);
      fs.writeFileSync(path, updatedStr);
    }
  }

  WriteJson("./data.json");
};
