import { log } from 'console';
import { NextFunction, Request, Response } from 'express';
import { Op } from 'sequelize';
import { decodeToken } from '../../utils/auth';
import { uploadToS3 } from '../../utils/awsBucketS3';
import { ProductModel } from '../models/product.model';
import { SalesModel } from '../models/sale.model';
import { SalesDetailModel } from '../models/sales_detail.model';

export class SalesController {
  static async createPayForUser(req: Request, res: Response, next: NextFunction) {
    try {
      const pay: { reference: string } = JSON.parse(req.body.payment);
      const products_payment_info: { id: number; quantity: number }[] = JSON.parse(req.body.products);
      const pay_method = JSON.parse(req.body.pay_method);
      const current_rate = Number(req.body.current_rate);

      const token = req.headers.authorization;
      const user = decodeToken(token as string);

      //ids de productos comprados
      const ids_product = products_payment_info.map((p) => p.id);

      // Productos completos comprados
      const products = await ProductModel.findAll({
        where: { id: { [Op.in]: ids_product } }
      });

      if (!products.length) {
        res.status(409).json({ error: 'Productos no encontrados', key: 'NO_PRODUCTS' });
        return;
      }

      let total_usd = 0;
      let total_bs = 0;

      let saleDetails = products.map((product) => {
        const info = products_payment_info.find((p) => p.id === product.id);

        if (!info) throw new Error('Producto inválido');

        if (product.stock < info.quantity) {
          res.status(409).json({ error: `Stock insuficiente para ${product.name}`, key: 'NO_STOCK' });
          return;
        }

        const subtotal_usd = product.price * info.quantity;
        const subtotal_bs = subtotal_usd * current_rate;

        total_usd += subtotal_usd;
        total_bs += subtotal_bs;

        return {
          id_product: product.id,
          quantity: info.quantity,
          price_usd: product.price,
          price_bs: product.price * current_rate,
          subtotal_usd,
          subtotal_bs,
          rate_day: current_rate,
          id_user: user.user.id,
          reference: pay.reference,
          pay_method_id: pay_method.id
        };
      });

      let sale: SalesModel;
      let url_img: string | null = null;
      
      if (req.file && saleDetails) {
        url_img = (await uploadToS3(req.file, 'user_payments')).url;
        sale = await SalesModel.create({
          id_user: user.user.id,
          total_usd,
          total_bs,
          rate_day: current_rate,
          reference: pay.reference,
          pay_method_id: pay_method.id,
          url_img
        });

        // Guardar detalles
        await SalesDetailModel.bulkCreate(
          saleDetails.map((d: any) => ({
            id_product: d.id_product,
            count: d.quantity,
            subtotal_usd: d.subtotal_usd,
            subtotal_bs: d.subtotal_bs,
            id_sale: sale.id
          }))
        );

        // Bajar stock del producto
        for (const product of products) {
          const info = products_payment_info.find((p) => p.id === product.id)!;

          await product.update({
            stock: product.stock - info.quantity
          });
        }
      }

      res.json({});
    } catch (err) {
      next(err);
    }
  }
}
