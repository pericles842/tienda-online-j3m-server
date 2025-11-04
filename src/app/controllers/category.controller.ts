import { NextFunction, Request, Response } from 'express';
import { CategoryModel } from '../models/category.model';

export class CategoryController {
  /**
   * Lista las categorias en arbol
   *
   * @static
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @memberof CategoryController
   */
  static async getCategoriesTree(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await CategoryModel.getCategoriesTree();
      res.json(categories);
    } catch (err) {
      next(err);
    }
  }

  static async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await CategoryModel.findAll();
      res.json(categories);
    } catch (err) {
      next(err);
    }
  }

  static async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      let category = req.body;
      category = await CategoryModel.create(category);
      res.json(category);
    } catch (err) {
      next(err);
    }
  }
}
