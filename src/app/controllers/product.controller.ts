import { Request, Response, NextFunction } from 'express';
import { ProductAttributeModel } from '../models/product_attribute.model';

export class ProductController {
  static async getAllAttributesProduct(req: Request, res: Response, next: NextFunction) {
    try {
      let attributes = await ProductAttributeModel.findAll();
      res.json(attributes);
    } catch (err) {
      next(err);
    }
  }
}
