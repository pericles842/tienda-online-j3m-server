import { log } from 'console';
import { NextFunction, Request, Response } from 'express';
import { decodeToken } from '../../utils/auth';
import { extractKeyFromUrl, uploadToS3 } from '../../utils/awsBucketS3';
import { CategoryModel } from '../models/category.model';
import { ProductModel } from '../models/product.model';
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

  static async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization;
      const user = decodeToken(token as string);
      let product = JSON.parse(req.body.product);

      product.user_update_id = user.user.id;
      product.updated_at = Date.now();

      if (req.file) {
        let key_url = extractKeyFromUrl('products', product.url_img);
        if (key_url) await uploadToS3(req.file, 'products', key_url);
      }

      if (req.file && !product.url_img) {
        product.url_img = (await uploadToS3(req.file, 'products')).url;
      }
      await ProductModel.update(product, { where: { id: product.id } });

      [product] = await ProductModel.getAllProducts(product.id);

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
