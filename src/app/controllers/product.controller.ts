import { log } from 'console';
import { NextFunction, Request, Response } from 'express';
import { decodeToken } from '../../utils/auth';
import { deleteFile, extractKeyFromUrl, uploadToS3 } from '../../utils/awsBucketS3';
import { CategoryModel } from '../models/category.model';
import { ProductModel } from '../models/product.model';
import { ProductAttributeModel } from '../models/product_attribute.model';
import { convertQueryParamsArray } from '../../middlewares/arrays';
import { PayMethodsModel } from '../models/pay_method.model';
import { Op } from 'sequelize';

export class ProductController {
  static async getAllAttributesProduct(req: Request, res: Response, next: NextFunction) {
    try {
      let attributes = await ProductAttributeModel.findAll();
      res.json(attributes);
    } catch (err) {
      next(err);
    }
  }

  static async getAllPublicProducts(req: Request, res: Response, next: NextFunction) {
    try {
      let products = await ProductModel.getAllProducts();
      res.json(products);
    } catch (err) {
      next(err);
    }
  }

  static async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      let id = req.params.id;
      let [product] = await ProductModel.getAllProducts(Number(id));
      res.json(product);
    } catch (err) {
      next(err);
    }
  }

  static async updateStatusProduct(req: Request, res: Response, next: NextFunction) {
    try {
      let product = req.body.data;
      const token = req.headers.authorization;
      const user = decodeToken(token as string);

      await ProductModel.update(
        {
          status: product.status,
          updated_at: Date.now(),
          user_update_id: user.user.id
        },
        { where: { id: product.id } }
      );

      [product] = await ProductModel.getAllProducts(product.id);
      res.json(product);
    } catch (err) {
      next(err);
    }
  }

  static async supplyStock(req: Request, res: Response, next: NextFunction) {
    try {
      let product = req.body.data;
      const token = req.headers.authorization;
      const user = decodeToken(token as string);

      await ProductModel.update(
        {
          stock: product.stock,
          updated_at: Date.now(),
          user_update_id: user.user.id
        },
        { where: { id: product.id } }
      );

      [product] = await ProductModel.getAllProducts(product.id);
      res.json(product);
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

      [product] = await ProductModel.getAllProducts(product.id);

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
  static async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      let ids = req.query.id;

      const ids_array = convertQueryParamsArray(ids as string);
      const products = await ProductModel.findAll({ where: { id: { [Op.in]: ids_array } } });

      let keys_url = [];
      for (const product of products) {
        if (product.url_img) {
          let url = extractKeyFromUrl('products', product.url_img);
          if (url) keys_url.push(url);
        }
      }

      await ProductModel.destroy({
        where: { id: { [Op.in]: ids_array } }
      });

      await deleteFile(keys_url);

      res.json({ ids: ids_array });
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

  static async getAllProductsByFilter(req: Request, res: Response, next: NextFunction) {
    try {
      const search = req.query.search as string;
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      let products = await ProductModel.getProductsFilter(search, page, limit);

      res.json(
        {
          data: products.data,
          total: products.total,
          totalPages: products.totalPages,
          currentPage: page,
          itemsPerPage: limit,
        }
      );
    } catch (err) {
      next(err);
    }
  }
}
