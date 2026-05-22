import { Request, Response } from "express";
import { CountryService } from "../services/country.service";
import { error } from "node:console";

const service = new CountryService();

export class CountryController {

    create = async (req: Request, res: Response) => {
    try {
      const result = await service.create(req.body.name);
      res.json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  getAll = async (_req: Request, res: Response) => {
    try {
      const result = await service.findAll();
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
       
        const id: string = req.body.id;
        if(!id){
            throw new error("id not found")
        }

      const result = await service.update(id, req.body.name);
      res.json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    const id: string = req.body.id;
        if(!id){
            throw new error("id not found")
        }

    try {
      const result = await service.delete(id);
      res.json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
}