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
      let categories = await CategoryModel.getCategoriesTree();

      let node_categories =
        (await CategoryModel.findCategoryById(categories, category.parent_id)) ||
        (await CategoryModel.findCategoryById(categories, category.id));

      res.json({ category, node_categories });
    } catch (err) {
      next(err);
    }
  }

  static async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      let category = req.body;
      await CategoryModel.update(category, { where: { id: category.id } });
      let categories = await CategoryModel.getCategoriesTree();

      let node_categories =
        (await CategoryModel.findCategoryById(categories, category.parent_id)) ||
        (await CategoryModel.findCategoryById(categories, category.id));

      res.json({ category, node_categories });
    } catch (err) {
      next(err);
    }
  }
}
