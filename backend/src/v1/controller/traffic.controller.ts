import { Request, Response } from "express";
import { TrafficService } from "../services/traffic.service.js";


const trafficService = new TrafficService();
const toMessage = (err: unknown) => (err instanceof Error ? err.message : String(err));
export class TrafficController {
  
  async getAll(req: Request, res: Response) {
    try {
      const data = await trafficService.findAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: toMessage(err) });
    }
  }

  async getByCountry(req: Request, res: Response) {
    try {
      const data = await trafficService.getByCountry();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: toMessage(err) });
    }
  }

  getVehicleByCountry = async (req: Request, res: Response) => {
    try {
      const { countryId } = req.params;
      const safeId = Array.isArray(countryId) ? countryId[0] : countryId;  
      const data = await trafficService.getVehicleByCountry(safeId);
  
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: "Error fetching data" + err });
    }
  };

  async create(req: Request, res: Response) {
    try {
      const { countryId, vehicleType, count, recordedAt } = req.body;

      if (!countryId || !vehicleType || !count) {
        res.status(400).json({ error: "countryId, vehicleTypeId and count are required" });
        return;
      }

      const data = await trafficService.create({
        countryId,
        vehicleType,
        count,
        recordedAt: recordedAt ? new Date(recordedAt) : new Date()
      });

      res.status(201).json(data);
    } catch (err) {
      res.status(500).json({ error: toMessage(err) });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { count, recordedAt } = req.body;
      const safeId = Array.isArray(id) ? id[0] : id;

      if (!count && !recordedAt) {
        res.status(400).json({ error: "Nothing to update" });
        return;
      }

      const data = await trafficService.update(safeId, {
        ...(count      && { count }),
        ...(recordedAt && { recordedAt: new Date(recordedAt) })
      });

      res.json(data);
    } catch (err) {
      if (toMessage(err) === "Traffic record not found") {
        res.status(404).json({ error: toMessage(err) });
        return;
      }
      res.status(500).json({ error: toMessage(err) });
    }
  }

  async upsert(req: Request, res: Response) {
    try {
      const { countryId, vehicleType, count } = req.body;

      if (!countryId || !vehicleType || !count) {
        res.status(400).json({ error: "countryId, vehicleTypeId and count are required" });
        return;
      }

      const data = await trafficService.upsert({ countryId, vehicleType, count });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: toMessage(err) });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const safeId = Array.isArray(id) ? id[0] : id;
      const data = await trafficService.delete(safeId);
      res.json(data);
     } catch (err) {
      if (toMessage(err) === "Traffic record not found") {
        res.status(404).json({ error: toMessage(err) });
        return;
      }
      res.status(500).json({ error: toMessage(err) });
    }
  }
}