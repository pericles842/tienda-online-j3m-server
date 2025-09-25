import { Request, Response, NextFunction } from "express";
import { PublicGroupsModel } from "../models/public_groups.model";

export class PublicGroupsController {
  /**
   *Lista todas las cajas de ahorro
   *
   * @static
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @memberof PublicGroupsController
   */
  static async getPublicGroups(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const groups = await PublicGroupsModel.findAll();
      res.json(groups);
    } catch (err) {
      next(err);
    }
  }
}
