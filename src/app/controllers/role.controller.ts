import { Request, Response, NextFunction } from "express";
import { Role } from "../models/role.model";


export class RoleController {
  static async getRoles(req: Request, res: Response, next: NextFunction) {
    try {
      const roles = await Role.findAll();
      res.json(roles);
    } catch (err) {
      next(err);
    }
  }
}
