// src/models/user.model.ts
import { sequelize } from '../config/db';
import { Usuario } from '../models/user.model';

export class UserController {

  static async getAll(req: any, res: any) {
    try {
      const users = await Usuario.findAll();
      res.json(users, 200);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
  }
  static async listarQuery(req: any, res: any) {
    try {
      const users = await Usuario.listar();
      res.json(users, 200);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
  }
}