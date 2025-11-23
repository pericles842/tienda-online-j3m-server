import { Request, Response, NextFunction } from 'express';
import { PublicGroupsModel } from '../models/public_groups.model';
import { json } from 'sequelize';
import { uploadToS3 } from '../../utils/awsBucketS3';

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
  static async getPublicGroups(req: Request, res: Response, next: NextFunction) {
    try {
      const groups = await PublicGroupsModel.findAll();
      res.json(groups);
    } catch (err) {
      next(err);
    }
  }

  static async createPublicGroup(req: Request, res: Response, next: NextFunction) {
    try {
      let group = JSON.parse(req.body.group);

      if (req.file) {
        group.url_img = (await uploadToS3(req.file, 'groups')).url;
        group = await PublicGroupsModel.create(group);
      }

      res.json(group);
    } catch (err) {
      next(err);
    }
  }

  static async updatePublicGroup(req: Request, res: Response, next: NextFunction) {
    try {
      let group = JSON.parse(req.body.group);
      console.log(group)

      if (req.file) {
        // group.url_img = (await uploadToS3(req.file, 'groups')).url;
        // group = await PublicGroupsModel.create(group);
      }

      res.json(group);
    } catch (err) {
      next(err);
    }
  }
}
