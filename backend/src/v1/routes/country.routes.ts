import { Router } from "express";
import { CountryController } from "../controller/country.controller.js";

const router = Router();
const controller = new CountryController();

router.post("/", controller.create);
router.get("/", controller.getAll);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;