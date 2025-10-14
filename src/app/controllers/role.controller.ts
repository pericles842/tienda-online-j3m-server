import { Request, Response, NextFunction } from "express";
import { ModulePermissions, Role } from "../models/role.model";
import { ChargesCreate, ChargesResponse } from "../interfaces/charges";

export class RoleController {
  static async getRoles(req: Request, res: Response, next: NextFunction) {
    try {
      const roles = await Role.findAll();
      res.json(roles);
    } catch (err) {
      next(err);
    }
  }
  static async createRole(req: Request, res: Response, next: NextFunction) {
    try {
      let body: ChargesCreate = req.body;

      //creamos el rol
      const role = await Role.create({
        name: body.name,
        description: body.description,
      });

      const permissionsDataInsert = body.permissions.map((permission) => ({
        role_id: role.id,
        module_id: permission.module_id,
        can_view: permission.can_view,
        can_create: permission.can_create,
        can_update: permission.can_update,
        can_delete: permission.can_delete,
      }));

      body.id = role.id;
      body.permissions =  await ModulePermissions.bulkCreate(permissionsDataInsert) as any;

      res.json(body);
  
    } catch (err) {
      next(err);
    }
  }
}
