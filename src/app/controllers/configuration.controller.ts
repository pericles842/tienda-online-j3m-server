import { NextFunction, Request, Response } from 'express';
import { ConfigurationModel } from '../models/configuration.model';
import { DollarRatesModel } from '../models/dollar_rates.model';

export class ConfigurationController {
  static async getConfiguration(req: Request, res: Response, next: NextFunction) {
    try {
      const config = await ConfigurationModel.findOne({ where: { id: 1 } });
      res.json(config);
    } catch (err) {
      next(err);
    }
  }

  static async getRatesDollar(req: Request, res: Response, next: NextFunction) {
    try {
      const rates = await DollarRatesModel.findAll();
      res.json(rates);
    } catch (err) {
      next(err);
    }
  }

  static async updateConfig() {}
}
