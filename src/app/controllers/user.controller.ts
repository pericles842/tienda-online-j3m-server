import { NextFunction, Request, Response } from "express";
import { Usuario } from "../models/user.model";
import { UserPermissions } from "../models/role.model";

import jwt from "jsonwebtoken";
import { comparePassword, hashPassword } from "../../utils/auth";

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
      let user = await Usuario.findOne({ where: { email } });
      if (!user) throw "Credenciales inválidas";

      const match = await comparePassword(password, user.password);
      if (!match) throw "Credenciales inválidas";

      let [full_user] = await Usuario.getUsers(user.id);

      const userNotPassword: any = {
        id: full_user.id,
        name: full_user.name,
        last_name: full_user.last_name,
        email: full_user.email,
        phone: full_user.phone,
        ci: full_user.ci,
        role: full_user.role,
        url_img: full_user.url_img,
        rol_id: full_user.rol_id,
        public_group_id: full_user.public_group_id,
        state_id: full_user.state_id,
        city_id: full_user.city_id,
        parish_id: full_user.parish_id,
        created_at: full_user.created_at,
      };

      const permissions = await UserPermissions.getUserPermission(user.id);
      const accessToken = jwt.sign({ user: userNotPassword }, JWT_SECRET, {
        expiresIn: "1min",
      });

      const refreshToken = jwt.sign(
        { userId: userNotPassword.id },
        JWT_REFRESH,
        {
          expiresIn: "7d",
        }
      );

      //guardamos en la cokki hhtponly el refres token
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure:true,
        sameSite: "none",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
      });

      const { id, name, last_name, role, rol_id } = full_user;
      //jwt.verify(token, JWT_SECRET)
      res.json({
        user: { id, name, last_name, email, role, rol_id, permissions },
        accessToken,
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   *Controla la auteticacion del usuario genera el token
   *
   * @static
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @memberof UserController
   */
  static async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies.refreshToken;
      console.log(req.cookies);
      if (!refreshToken) {
        throw "No hay refresh token";
      }

      const payload = jwt.verify(refreshToken, JWT_REFRESH) as {
        userId: number;
      };

      const [full_user] = await Usuario.getUsers(payload.userId);

      let permissions = await UserPermissions.getUserPermission(full_user.id);

      const userNotPassword: any = {
        id: full_user.id,
        name: full_user.name,
        last_name: full_user.last_name,
        email: full_user.email,
        phone: full_user.phone,
        ci: full_user.ci,
        role: full_user.role,
        url_img: full_user.url_img,
        rol_id: full_user.rol_id,
        public_group_id: full_user.public_group_id,
        state_id: full_user.state_id,
        city_id: full_user.city_id,
        parish_id: full_user.parish_id,
        created_at: full_user.created_at,
      };
      const { id, name, last_name, role, rol_id, email } = full_user;
      const accessToken = jwt.sign({ user: userNotPassword }, JWT_SECRET, {
        expiresIn: "1min",
      });
      res.json({
        user: { id, name, last_name, email, role, rol_id, permissions },
        accessToken,
      });
    } catch (err) {
      next(err);
    }
  }
}
