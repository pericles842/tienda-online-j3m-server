import { NextFunction, Request, Response } from 'express';

export class PayMethodController {
  static async createPayMethod(req: Request, res: Response, next: NextFunction) {
    try {
      let pay_method = JSON.parse(req.body.pay_method);

      console.log(pay_method);

      res.json(pay_method);
    } catch (err) {
      next(err);
    }
  }
}
