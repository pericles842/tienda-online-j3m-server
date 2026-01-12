import { NextFunction, Request, Response } from 'express';
import { decodeToken } from '../../utils/auth';
import { uploadToS3 } from '../../utils/awsBucketS3';
import { ProductModel } from '../models/product.model';
import { ProductAttributeModel } from '../models/product_attribute.model';
import { stat } from 'fs';

export class ProductController {
  static async getAllAttributesProduct(req: Request, res: Response, next: NextFunction) {
    try {
      let attributes = await ProductAttributeModel.findAll();
      res.json(attributes);
    } catch (err) {
      next(err);
    }
  }

  static async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization;
      const user = decodeToken(token as string);

      let product = JSON.parse(req.body.product);

      product.user_create_id = user.user.id;
      product.status = 'active';

      if (req.file) {
        product.url_img = (await uploadToS3(req.file, 'products')).url;
        product = await ProductModel.create(product);
      }

      res.json(product);
    } catch (err) {
      next(err);
    }
  }

  static async getAllFullProducts(req: Request, res: Response, next: NextFunction) {
    try {
      let products = await ProductModel.getAllProducts();
      res.json(products);
    } catch (err) {
      next(err);
    }
  }
}
