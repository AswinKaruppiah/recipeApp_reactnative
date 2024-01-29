import Recipe from "../model/recipeschema.js";

import Diet from "../model/dietschema.js";

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

    res.status(200).json(recipe);
    // var size = Recipe.collection.count();
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get all for types
export const cuisine = async (req, res) => {
  try {
    const recipe = await Recipe.aggregate([
      {
        $match: {
          cuisine: req.params.cuisine,
        },
      },

      {
        $sample: {
          size: 20,
        },
      },
    ]);
    res.status(200).json(recipe);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const course = async (req, res) => {
  try {
    const recipe = await Recipe.aggregate([
      {
        $match: {
          course: req.params.course,
        },
      },

      {
        $sample: {
          size: 50,
        },
      },
    ]);
    res.status(200).json(recipe);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const diet = async (req, res) => {
  try {
    const recipe = await Recipe.aggregate([
      {
        $match: {
          diet: req.params.diet,
        },
      },

      {
        $sample: {
          size: 20,
        },
      },
    ]);
    res.status(200).json(recipe);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Random
export const random = async (req, res) => {
  try {
    const recipe = await Recipe.aggregate([{ $sample: { size: 50 } }]);

    res.status(200).json(recipe);
    // var size = Recipe.collection.count();
  } catch (err) {
    res.status(500).json(err);
  }
};

export const search = async (req, res) => {
  try {
    const findname = req.params.name;
    const objs = await Recipe.aggregate([
      {
        $match: { name: { $regex: ".*" + findname + ".*" } },
      },
      {
        $sample: {
          size: 50,
        },
      },
    ]);
    res.json(objs);
  } catch (error) {
    res.json({ message: error });
  }
};
