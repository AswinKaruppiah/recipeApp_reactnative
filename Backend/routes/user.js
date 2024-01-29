import express from "express";
import {
  getall,
  cuisine,
  course,
  diet,
  random,
  search,
} from "../controller/user.js";

const router = express.Router();

router.get("/get/:page", getall);
router.get("/random", random);
router.get("/cuisine/:cuisine", cuisine);
router.get("/course/:course", course);
router.get("/diet/:diet", diet);
router.get("/search/:name", search);

export default router;
