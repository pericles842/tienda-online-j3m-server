// src/models/user.model.ts

import { Request, Response, NextFunction } from "express";
import { Usuario } from "../models/user.model";

import { comparePassword, hashPassword } from "../../utils/auth";
import jwt from "jsonwebtoken";
import { nextTick } from "process";

const JWT_SECRET = process.env.JWT_SECRET || "cambiame_por_env";
const JWT_EXPIRES = "2h";

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

      ///!AVEGIRGUAR COMO ANDAR ESTO EN LA SPETICIOES
      const token = jwt.sign({user}, JWT_SECRET, { expiresIn: JWT_EXPIRES });
      res.json(token);
    } catch (err) {
      next(err);
    }
  }

  static async getAll(req: any, res: any) {
    try {
      const users = await Usuario.findAll();
      res.json(users, 200);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener los usuarios" });
    }
  }
  static async listarQuery(req: any, res: any) {
    try {
      const users = await Usuario.getUsers();
      res.json(users, 200);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener los usuarios" });
    }
  }
}
