import { NextFunction, Request, Response } from 'express';
import { PayMethodsModel } from '../models/pay_method.model';
import { uploadToS3 } from '../../utils/awsBucketS3';

export class PayMethodController {
  static async getPayMethods(req: Request, res: Response, next: NextFunction) {
    try {
      const pay_methods = await PayMethodsModel.findAll();
      res.json(pay_methods);
    } catch (err) {
      next(err);
    }
  }

  static async createPayMethod(req: Request, res: Response, next: NextFunction) {
    try {
      let pay_method = JSON.parse(req.body.pay_method);

      if (req.file) {
        pay_method.url_img = (await uploadToS3(req.file, 'pay_methods')).url;
        pay_method = await PayMethodsModel.create(pay_method);
      }

      res.json(pay_method);
    } catch (err) {
      next(err);
    }
  }
}
