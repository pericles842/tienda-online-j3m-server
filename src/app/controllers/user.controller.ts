import { NextFunction, Request, Response } from 'express';
import { UserPermissions } from '../models/role.model';
import { Usuario } from '../models/user.model';

import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import { comparePassword, decodeToken, hashPassword } from '../../utils/auth';

const JWT_SECRET: string = process.env.JWT_SECRET || '';
const JWT_REFRESH: string = process.env.JWT_REFRESH || '';

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
  static async editUser(req: Request, res: Response, next: NextFunction) {
    try {
      let userRequest = req.body;
      const user = await Usuario.findOne({ where: { id: userRequest.id } });

      //const isSamePassword = await comparePassword(userRequest.password, user!.password);

      // si la contraseña no es la misma la encriptamos esta comparando el hash puro
      if (userRequest.password !== user!.password) {
        userRequest.password = await hashPassword(userRequest.password);
      }

      await Usuario.update(userRequest, { where: { id: userRequest.id } });

      const [userResponse] = await Usuario.getUsers(userRequest.id);

      // Encriptar la contraseña
      // const passwordHash = await hashPassword(req.body.password);

      // Agregar la contraseña encriptada
      // req.body.password = passwordHash;

      // const { id } = await Usuario.create(req.body);
      // const [user] = await Usuario.getUsers(id);

      res.json(userResponse);
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
  static async authenticateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      let user = await Usuario.findOne({ where: { email } });
      if (!user) throw 'Credenciales inválidas';

      const match = await comparePassword(password, user.password);
      if (!match) throw 'Credenciales inválidas';

      let [full_user] = await Usuario.getUsers(user.id);
      const permissions = await UserPermissions.getUserPermission(user.id);

      const userNotPassword: any = {
        id: full_user.id,
        name: full_user.name,
        last_name: full_user.last_name,
        email: full_user.email,
        phone: full_user.phone,
        phone_2: full_user.phone_2,
        age: full_user.age,
        ci: full_user.ci,
        role: full_user.role,
        url_img: full_user.url_img,
        rol_id: full_user.rol_id,
        public_group_id: full_user.public_group_id,
        state_id: full_user.state_id,
        city_id: full_user.city_id,
        parish_id: full_user.parish_id,
        created_at: full_user.created_at,
        savings_box: full_user.savings_box,
        state: full_user.state,
        municipality: full_user.municipality,
        parish: full_user.parish,
        permissions: permissions
      };

      const accessToken = jwt.sign({ user: userNotPassword }, JWT_SECRET, {
        expiresIn: '1h'
      });

      const refreshToken = jwt.sign({ userId: userNotPassword.id }, JWT_REFRESH, {
        expiresIn: '7d'
      });

      //guardamos en la cokki hhtponly el refres token
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
      });

      const { id, name, last_name, role, rol_id } = full_user;
      //jwt.verify(token, JWT_SECRET)
      res.json({
        user: { id, name, last_name, email, role, rol_id },
        accessToken
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

      if (!refreshToken) {
        throw 'No hay refresh token';
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
        phone_2: full_user.phone_2,
        age: full_user.age,
        ci: full_user.ci,
        role: full_user.role,
        url_img: full_user.url_img,
        rol_id: full_user.rol_id,
        public_group_id: full_user.public_group_id,
        state_id: full_user.state_id,
        city_id: full_user.city_id,
        parish_id: full_user.parish_id,
        created_at: full_user.created_at,
        savings_box: full_user.savings_box,
        state: full_user.state,
        municipality: full_user.municipality,
        parish: full_user.parish,
        permissions: permissions
      };
      const { id, name, last_name, role, rol_id, email } = full_user;
      const accessToken = jwt.sign({ user: userNotPassword }, JWT_SECRET, {
        expiresIn: '1h'
      });
      res.json({
        user: { id, name, last_name, email, role, rol_id },
        accessToken
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   *Lista los usuarios del sismta , no lista el usuario que esta ejecutando la petición
   *
   * @static
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @memberof UserController
   */
  static async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = decodeToken(req.headers.authorization as string);
      let usuarios = await Usuario.getUsers(null, payload.user.id);

      res.json(usuarios);
    } catch (err) {
      next(err);
    }
  }

  /**
   *Elimina un registro
   *
   * @static
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @memberof UserController
   */
  static async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const id_response = await Usuario.destroy({ where: { id } });
      res.json(id_response);
    } catch (err) {
      next(err);
    }
  }

  /**
   *Elimina grupos de usuarios
   *
   * @static
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @memberof UserController
   */
  static async deleteGroupUsers(req: Request, res: Response, next: NextFunction) {
    try {
      let ids = req.query.id;
      const ids_array = Array.isArray(ids) ? ids.map(Number) : [Number(ids)];

      await Usuario.destroy({
        where: { id: { [Op.in]: ids_array } }
      });

      res.json({ ids_array });
    } catch (err) {
      next(err);
    }
  }

  /**
   *Obtiene un usuario
   *
   * @static
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @memberof UserController
   */
  static async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const [usuarios] = await Usuario.getUsers(Number(id));

      res.json(usuarios);
    } catch (err) {
      next(err);
    }
  }
}
