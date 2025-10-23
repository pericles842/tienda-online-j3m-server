// src/routes/user.routes.ts
import { Router } from 'express';
import { authMiddleware } from './middlewares/authMiddleware';
import { UserController } from './app/controllers/user.controller';
import { RoleController } from './app/controllers/role.controller';
import { StatesController } from './app/controllers/state.controller';
import { PublicGroupsController } from './app/controllers/public_groups.controller';
import { ReportController } from './app/controllers/report.controller';

const router = Router();

//*Autenticacion
router.post('/users/create-client', UserController.createUser);
router.post('/users/authenticate', UserController.authenticateUser);
router.post('/users/refreshToken', UserController.refreshToken);

//*Usuarios
router.get('/users', authMiddleware, UserController.getUsers);
router.get('/users/:id', UserController.getUser);
router.post('/users/create', authMiddleware, UserController.createUser);
router.put('/users/edit', authMiddleware, UserController.editUser);
router.put('/users/edit-profile', UserController.editUser);
router.delete('/users/delete/:id', authMiddleware, UserController.deleteUser);
router.delete('/users/delete-group', authMiddleware, UserController.deleteGroupUsers);

//*MUNICIPIOS Y CIUDADES
router.get('/states', StatesController.getStates);
router.get('/cities/:id_state', StatesController.getMunicipalities);
router.get('/parishes/:id_city', StatesController.getParishes);

//*Cajas de ahorro
router.get('/public_groups', PublicGroupsController.getPublicGroups);

//*ROLES Y CARGOS
router.get('/roles', RoleController.getRoles);
router.post('/create-role', authMiddleware, RoleController.createRole);
router.get('/role-permissions', authMiddleware, RoleController.getRolePermissions);
router.delete('/role-permissions/:id', authMiddleware, RoleController.deleteRolePermissions);
router.delete('/role-group-permissions', authMiddleware, RoleController.deleteGroupRolePermissions);

//*Reportes de usuarios
router.get('/users-report', authMiddleware, ReportController.userReport);
router.get('/charge-report', authMiddleware, ReportController.ChargeReport);
router.get('/groups-report', authMiddleware, ReportController.groupsReport);

export default router;
