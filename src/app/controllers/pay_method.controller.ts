import { NextFunction, Request, Response } from 'express';
import { PayMethodsModel } from '../models/pay_method.model';
import { deleteFile, extractKeyFromUrl, uploadToS3 } from '../../utils/awsBucketS3';
import { convertQueryParamsArray } from '../../middlewares/arrays';
import { Op } from 'sequelize';

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

  static async updatePayMethod(req: Request, res: Response, next: NextFunction) {
    try {
      let pay_method = JSON.parse(req.body.pay_method);

      if (req.file) {
        let key_url = extractKeyFromUrl('pay_methods', pay_method.url_img);
        if (key_url) await uploadToS3(req.file, 'pay_methods', key_url);
      }

      if (req.file && !pay_method.url_img) {
        pay_method.url_img = (await uploadToS3(req.file, 'pay_methods')).url;
      }
      await PayMethodsModel.update(pay_method, { where: { id: pay_method.id } });
      pay_method = await PayMethodsModel.findByPk(pay_method.id);

      res.json(pay_method);
    } catch (err) {
      next(err);
    }
  }

  static async deletePayMethod(req: Request, res: Response, next: NextFunction) {
    try {
      let ids = req.query.id;
      const ids_array = convertQueryParamsArray(ids as string);
      const groups = await PayMethodsModel.findAll({ where: { id: { [Op.in]: ids_array } } });

      let keys_url = [];
      for (const group of groups) {
        if (group.url_img) {
          let url = extractKeyFromUrl('pay_methods', group.url_img);
          if (url) keys_url.push(url);
        }
      }

      await PayMethodsModel.destroy({
        where: { id: { [Op.in]: ids_array } }
      });

      await deleteFile(keys_url);

      res.json({ ids: ids_array });
    } catch (err) {
      next(err);
    }
  }
}
