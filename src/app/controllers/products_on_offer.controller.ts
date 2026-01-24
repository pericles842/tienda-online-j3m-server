import { Request, Response, NextFunction } from 'express';
import { ProductOnOffer } from '../models/products_on_offer.model';
import { Op } from 'sequelize';
import { convertQueryParamsArray } from '../../middlewares/arrays';

export class ProductOnOfferController {
  //LOS METODOS SON STATIC ASYCN
  //      static async getParishes(req: Request, res: Response, next: NextFunction) {
  //     try {
  //       const roles = await States.getParishes(parseInt(req.params.id_city));
  //       res.json(roles);
  //     } catch (err) {
  //       next(err);
  //     }
  //   }

  static async createProductOnOffer(req: Request, res: Response, next: NextFunction) {

    try {

      const { product_id } = req.body;

      if (!product_id) {

        throw 'El ID del producto es requerido'

      }

      const existing = await ProductOnOffer.findOne({
        where: {
          product_id: product_id
        }
      })

      if (existing) {

        throw 'Este producto ya esta en oferta'

      }

      const productOnOffer = await ProductOnOffer.create({
        product_id: product_id,
      });

      res.status(201).json(productOnOffer);
    } catch (err) {

      next(err);

    }

  }

  static async deleteProductOnOffer(req: Request, res: Response, next: NextFunction) {

    try {

      let ids = req.query.id;

      if (!ids) {

        throw 'Debe insertar al menos un ID';

      }

      const ids_array = convertQueryParamsArray(ids as string);

      await ProductOnOffer.destroy({
        where: {
          id: {
            [Op.in]: ids_array
          }
        }
      })

      res.status(200).json({
        message: 'Productos eliminados correctamente'
      })

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
