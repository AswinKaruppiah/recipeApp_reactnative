import express from "express";
import {
  deleterecipe,
  getall,
  cuisine,
  course,
  diet,
  createrecipe,
  updateRecipe,
  navsupload,
  navs,
  navadd,
} from "../controller/admin.js";

const router = express.Router();

router.get("/get/:page", getall);

router.get("/navs", navs);
router.delete("/:id", deleterecipe);
router.get("/cuisine/:cuisine", cuisine);
router.get("/course/:course", course);
router.get("/diet/:diet", diet);
router.post("/create", createrecipe);
router.put("/update/:id", updateRecipe);

//  write in json nav
router.get("/navsupload", navsupload);

//upload to db
router.get("/navs", navs);
// add nav
// router.post("/navadd", navadd);

export default router;
