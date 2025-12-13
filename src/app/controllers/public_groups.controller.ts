import { NextFunction, Request, Response } from 'express';
import { Op } from 'sequelize';
import { deleteFile, extractKeyFromUrl, uploadToS3 } from '../../utils/awsBucketS3';
import { PublicGroupsModel } from '../models/public_groups.model';
import { convertQueryParamsArray } from '../../middlewares/arrays';

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

      if (req.file) {
        let key_url = extractKeyFromUrl('groups', group.url_img);
        if (key_url) await uploadToS3(req.file, 'groups', key_url);
      }

      if (req.file && !group.url_img) {
        group.url_img = (await uploadToS3(req.file, 'groups')).url;
      }
      group = await PublicGroupsModel.update(group, { where: { id: group.id } });

      res.json(group);
    } catch (err) {
      next(err);
    }
  }

  static async deletePublicGroup(req: Request, res: Response, next: NextFunction) {
    try {
      let ids = req.query.id;
      const ids_array = convertQueryParamsArray(ids as string);
      const groups = await PublicGroupsModel.findAll({ where: { id: { [Op.in]: ids_array } } });

      let keys_url = [];
      for (const group of groups) {
        if (group.url_img) {
          let url = extractKeyFromUrl('groups', group.url_img);
          if (url) keys_url.push(url);
        }
      }

      await PublicGroupsModel.destroy({
        where: { id: { [Op.in]: ids_array } }
      });

      await deleteFile(keys_url);

      res.json({ ids: ids_array });
    } catch (err) {
      next(err);
    }
  }
}
