import { Request, Response, NextFunction } from "express";
import { States } from "../models/states.model";

export class StatesController {
  static async getStates(req: Request, res: Response, next: NextFunction) {
    try {
      const roles = await States.getStates();
      res.json(roles);
    } catch (err) {
      next(err);
    }
  }

  static async getMunicipalities(req: Request, res: Response, next: NextFunction) {
    try {
      const roles = await States.getMunicipalities(parseInt(req.params.id_state));
      res.json(roles);
    } catch (err) {
      next(err);
    }
  }

  static async getParishes(req: Request, res: Response, next: NextFunction) {
    try {
      const roles = await States.getParishes(parseInt(req.params.id_city));
      res.json(roles);
    } catch (err) {
      next(err);
    }
  }
}
