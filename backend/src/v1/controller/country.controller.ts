import { Request, Response } from "express";
import { CountryService } from "../services/country.service";

const service = new CountryService();
const toMessage = (err: unknown) => (err instanceof Error ? err.message : String(err));
export class CountryController {

    create = async (req: Request, res: Response) => {
    try {
      const result = await service.create(req.body.name);
      res.json(result);
    } catch (err) {
      res.status(400).json({ message: toMessage(err) });
    }
  };

  getAll = async (_req: Request, res: Response) => {
    try {
      const result = await service.findAll();
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: toMessage(err) });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
        const id = req.params;
        const safeId = Array.isArray(id) ? id[0] : id;
        const result = await service.update(safeId, req.body.name);
      res.json(result);
    } catch (err) {
      res.status(400).json({ message: toMessage(err) });
    }
  };

  delete = async (req: Request, res: Response) => {
    const id  = req.params;
    const safeId = Array.isArray(id) ? id[0] : id;
     try {
      const result = await service.delete(safeId);
      res.json(result);
    } catch (err) {
      res.status(400).json({ message: toMessage(err) });
    }
  };
}