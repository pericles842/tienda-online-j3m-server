import { Request, Response, NextFunction } from "express";
import { Usuario } from "../models/user.model";
import { UserPermissions } from "../models/role.model";

import { comparePassword, hashPassword } from "../../utils/auth";
import jwt from "jsonwebtoken";

const JWT_SECRET: string = process.env.JWT_SECRET || "";
const JWT_REFRESH: string = process.env.JWT_REFRESH || "";

export class UserController {
  /**
   *Crear usuario
   *
   * @static
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @memberof UserController
   */
  static async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      // Encriptar la contraseña
      const passwordHash = await hashPassword(req.body.password);

      // Agregar la contraseña encriptada
      req.body.password = passwordHash;

      const { id } = await Usuario.create(req.body);
      const [user] = await Usuario.getUsers(id);

      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  /**
   *Controla la auteticacion del usuario genera el token y refresh tokeb
   *
   * @static
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @memberof UserController
   */
  static async authenticateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email, password } = req.body;
      const user = await Usuario.findOne({ where: { email } });

      if (!user) throw "Credenciales inválidas";

      const match = await comparePassword(password, user.password);
      if (!match) throw "Credenciales inválidas";

      //obtener los permisos
      const permissions = await UserPermissions.getUserPermission(user.id);

      const userNotPassword: any = {
        id: user.id,
        name: user.name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        ci: user.ci,
        url_img: user.url_img,
        rol_id: user.rol_id,
        public_group_id: user.public_group_id,
        state_id: user.state_id,
        city_id: user.city_id,
        parish_id: user.parish_id,
        created_at: user.created_at,
      };

      const accessToken = jwt.sign(
        { user: userNotPassword, permissions },
        JWT_SECRET,
        {
          expiresIn: "2h",
        }
      );

      const refreshToken = jwt.sign(
        { userId: userNotPassword.id },
        JWT_REFRESH,
        {
          expiresIn: "5d",
        }
      );

      //jwt.verify(token, JWT_SECRET)
      res.json({ accessToken, refreshToken });
    } catch (err) {
      next(err);
    }
  }
}
