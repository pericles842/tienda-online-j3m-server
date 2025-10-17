import { Request, Response, NextFunction } from "express";
import { ModulePermissions, Role, UserPermissions } from "../models/role.model";
import { ChargesCreate, ChargesResponse } from "../interfaces/charges";
import { Op } from "sequelize";

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
      let { id, name, description } = body;
      let role: any;

      //*creamos el rol
      if (body.id === 0) {
        //creamos el rol
        role = await Role.create({ name, description });

        const permissionsDataInsert = body.permissions.map((permission) => ({
          role_id: role.id,
          module_id: permission.module_id,
          can_view: permission.can_view,
          can_create: permission.can_create,
          can_update: permission.can_update,
          can_delete: permission.can_delete,
        }));

        body.id = role.id;
        body.permissions = (await ModulePermissions.bulkCreate(
          permissionsDataInsert
        )) as any;
      } else {
        role = await Role.update({ name, description }, { where: { id } });

        const permissionsDataUpdate = body.permissions.map((permission) => ({
          id: permission.id,
          role_id: id  as number,
          module_id: permission.module_id,
          can_view: permission.can_view,
          can_create: permission.can_create,
          can_update: permission.can_update,
          can_delete: permission.can_delete,
        }));

        // Actualiza o crea permisos usando updateOnDuplicate (más eficiente)
        (await ModulePermissions.bulkCreate(permissionsDataUpdate, {
          updateOnDuplicate: [
            "can_view",
            "can_create",
            "can_update",
            "can_delete",
          ],
        })) as any;

        // Traer los permisos actualizados
        body.permissions = (await ModulePermissions.findAll({
          where: { role_id: id },
        })) as any;
      }

      res.json(body);
    } catch (err) {
      next(err);
    }
  }
  static async getRolePermissions(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      let roles = await UserPermissions.getPermission();

      res.json(roles);
    } catch (err) {
      next(err);
    }
  }
  static async deleteRolePermissions(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      let { id } = req.params;
      if (Number(id) <= 6)
        throw "No se puede eliminar un cargo creado por el sistema";

      await ModulePermissions.destroy({ where: { role_id: id } });
      await Role.destroy({ where: { id } });
      res.json({});
    } catch (err) {
      next(err);
    }
  }

  static async deleteGroupRolePermissions(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      let ids = req.query.id;
      const ids_array = Array.isArray(ids) ? ids.map(Number) : [Number(ids)];

      const ids_to_delete_from_request = ids_array.filter(
        (id) => ![1, 2, 3, 4, 5, 6].includes(id)
      );

      await ModulePermissions.destroy({
        where: { role_id: { [Op.in]: ids_to_delete_from_request } },
      });

      await Role.destroy({
        where: { id: { [Op.in]: ids_to_delete_from_request } },
      });
      res.json({ ids_to_delete_from_request });
    } catch (err) {
      next(err);
    }
  }
}
