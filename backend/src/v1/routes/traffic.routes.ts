import { Router } from "express";
import { TrafficController } from "../controller/traffic.controller";


const router = Router();
const trafficController = new TrafficController();


router.get("/by-country",  trafficController.getByCountry);
router.get("/vehicle/:countryId", trafficController.getVehicleByCountry);


router.get("/",            trafficController.getAll);
router.post("/",           trafficController.create);
router.post("/upsert",     trafficController.upsert);
router.put("/:id",         trafficController.update);
router.delete("/:id",      trafficController.remove);

export default router;