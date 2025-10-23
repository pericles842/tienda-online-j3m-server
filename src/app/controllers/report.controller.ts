import { NextFunction, Request, Response } from 'express';
import { Usuario } from '../models/user.model';
import { generatePDF, setHeadersForPdf } from '../../utils/pdfGenerator';
import { ColumnsReport } from '../interfaces/report';
import { Module, UserPermissions } from '../models/role.model';
import { PublicGroupsModel } from '../models/public_groups.model';

export class ReportController {
  /**
   *Reporte de usuarios
   *
   * @static
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @memberof ReportController
   */
  static async userReport(req: Request, res: Response, next: NextFunction) {
    try {
      let usuarios = await Usuario.getUsers();
      const title = 'Listado de usuarios';
      const columns: ColumnsReport[] = [
        { dataType: 'string', width: 10, key: 'name', label: 'Nombre' },
        { dataType: 'string', width: 10, key: 'email', label: 'Correo' },
        { dataType: 'string', width: 10, key: 'role', label: 'Cargo' },
        { dataType: 'string', width: 10, key: 'phone', label: 'Teléfono' },
        { dataType: 'string', width: 10, key: 'ci', label: 'Cédula' },
        { dataType: 'date', width: 10, key: 'created_at', label: 'Fecha de Registro' }
      ];

      const pdfBuffer = await generatePDF('reporte', {
        title: title,
        columns: columns,
        data: usuarios
      });

      setHeadersForPdf(title, res);

      res.send(pdfBuffer);
    } catch (err) {
      next(err);
    }
  }

  static async ChargeReport(req: Request, res: Response, next: NextFunction) {
    try {
      let roles = await UserPermissions.getPermission();
      let modules = await Module.findAll();
      const title = 'Listado de cargos';

      const columns: ColumnsReport[] = [
        { dataType: 'string', width: 10, key: 'name', label: 'Nombre' },
        { dataType: 'array', width: 10, key: 'permissions', label: 'Description' },
        { dataType: 'date', width: 10, key: 'created_at', label: 'Fecha de Registro' }
      ];

      const pdfBuffer = await generatePDF('charges_permission_report', {
        title: title,
        columns: columns,
        data: roles,
        modulesMap: modules
      });

      setHeadersForPdf(title, res);

      res.send(pdfBuffer);
    } catch (err) {
      next(err);
    }
  }

  static async groupsReport(req: Request, res: Response, next: NextFunction) {
    try {
      let groups = await PublicGroupsModel.findAll();
      const title = 'Listado de Cajas de ahorro';
      const columns: ColumnsReport[] = [
        { dataType: 'string', width: 10, key: 'name', label: 'Nombre' },
        { dataType: 'string', width: 10, key: 'rif', label: 'Rif' },
        { dataType: 'string', width: 10, key: 'email', label: 'Correo' },
        { dataType: 'date', width: 10, key: 'created_at', label: 'Fecha de Registro' }
      ];

      const pdfBuffer = await generatePDF('reporte', {
        title: title,
        columns: columns,
        data: groups
      });

      setHeadersForPdf(title, res);

      res.send(pdfBuffer);
    } catch (err) {
      next(err);
    }
  }
}
