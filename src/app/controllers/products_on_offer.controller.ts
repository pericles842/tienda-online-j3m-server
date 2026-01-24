import { Request, Response, NextFunction } from 'express';
import { ProductOnOffer } from '../models/products_on_offer.model';
import { ProductModel } from '../models/product.model';
import { Op } from 'sequelize';
import { convertQueryParamsArray } from '../../middlewares/arrays';

export class ProductOnOfferController {

  static async createProductOnOffer(req: Request, res: Response, next: NextFunction) {
    try {
      // Capturar los IDs de los productos desde el cuerpo de la petición
      let ids: number[] = req.body;

      if (!Array.isArray(ids) || ids.length === 0) {
        throw new Error('Debe insertar al menos un ID en un arreglo');
      }

      // Asegurar que sean números únicos y válidos
      ids = [...new Set(ids.map(Number).filter((id) => !isNaN(id)))];

      if (ids.length === 0) {
        throw new Error('Debe insertar al menos un ID de producto válido');
      }

      const productsExist = await ProductModel.findAll({
        where: { id: { [Op.in]: ids } }
      });

      if (productsExist.length !== ids.length) {
        const foundIds = productsExist.map(p => p.id);
        const missingIds = ids.filter(id => !foundIds.includes(id));
        throw new Error(`Los siguientes IDs de producto no existen: ${missingIds.join(', ')}`);
      }

      const existing = await ProductOnOffer.findAll({
        where: {
          product_id: {
            [Op.in]: ids
          }
        }
      })

      if (existing.length > 0) {
        const existingIds = existing.map(e => e.product_id);
        throw new Error(`Algunos de los productos ya están en oferta: ${existingIds.join(', ')}`);
      }

      const productOnOffer = await ProductOnOffer.bulkCreate(
        ids.map((id: number) => ({ product_id: id }))
      );

      res.status(201).json(productOnOffer);
    } catch (err) {
      next(err);
    }
  }

  static async deleteProductOnOffer(req: Request, res: Response, next: NextFunction) {
    try {
      let ids = req.query.id;

      if (!ids) {
        throw new Error('Debe insertar al menos un ID');
      }

      const ids_array = convertQueryParamsArray(ids as string);

      await ProductOnOffer.destroy({
        where: { id: { [Op.in]: ids_array } }
      });

      res.status(200).json({
        message: 'Productos eliminados correctamente'
      });
    } catch (err) {
      next(err);
    }
  }

  static async getProductOnOffer(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await ProductOnOffer.getProductsOnOffer();

      res.json(products);
    } catch (err) {
      next(err);
    }
  }
}
