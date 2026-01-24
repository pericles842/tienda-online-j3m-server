import { Request, Response, NextFunction } from 'express';
import { States } from '../models/states.model';

export class SalesController {
  static async createPayForUser(req: Request, res: Response, next: NextFunction) {
    try {
      let pay = JSON.parse(req.body.pay);
      res.json(pay);
    } catch (err) {
      next(err);
    }
  }
}
