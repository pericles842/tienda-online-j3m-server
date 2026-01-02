// src/routes/user.routes.ts
import { Router } from 'express';
import { authMiddleware } from './middlewares/authMiddleware';
import { UserController } from './app/controllers/user.controller';
import { RoleController } from './app/controllers/role.controller';
import { StatesController } from './app/controllers/state.controller';
import { PublicGroupsController } from './app/controllers/public_groups.controller';
import { ReportController } from './app/controllers/report.controller';
import { CategoryController } from './app/controllers/category.controller';
import { ConfigurationController } from './app/controllers/configuration.controller';
import { PayMethodController } from './app/controllers/pay_method.controller';
import { upload } from './middlewares/upload';
import { ProductAttributeModel } from './app/models/product_attribute.model';
import { ProductController } from './app/controllers/product.controller';

const router = Router();

//*Autenticacion
router.post('/users/create-client', UserController.createUser);
router.post('/users/authenticate', UserController.authenticateUser);
router.post('/users/refreshToken', UserController.refreshToken);

//*CONFIGURATION
router.get('/configuration', authMiddleware, ConfigurationController.getConfiguration);
router.put('/configuration', authMiddleware, ConfigurationController.updateConfiguration);
router.get('/configuration-public', ConfigurationController.getConfiguration);
router.get('/rate-dollar-j3m', ConfigurationController.getRatesDollar);

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
router.post('/public_groups', authMiddleware, upload.single('image'), PublicGroupsController.createPublicGroup);
router.put('/public_groups', authMiddleware, upload.single('image'), PublicGroupsController.updatePublicGroup);
router.delete('/public_groups', authMiddleware, PublicGroupsController.deletePublicGroup);

//*ROLES Y CARGOS
router.get('/roles', RoleController.getRoles);
router.post('/create-role', authMiddleware, RoleController.createRole);
router.get('/role-permissions', authMiddleware, RoleController.getRolePermissions);
router.delete('/role-permissions/:id', authMiddleware, RoleController.deleteRolePermissions);
router.delete('/role-group-permissions', authMiddleware, RoleController.deleteGroupRolePermissions);

//*CATEGORIAS
router.get('/categories-tree', CategoryController.getCategoriesTree);
router.get('/categories-public', CategoryController.getPublicCategories);
router.get('/categories', authMiddleware, CategoryController.getCategories);
router.post('/create-category', authMiddleware, CategoryController.createCategory);
router.put('/update-category', authMiddleware, CategoryController.updateCategory);
router.delete('/delete-category/:id', authMiddleware, CategoryController.deleteCategory);

//*PRODUCTOS
router.get('/products-attributes', ProductController.getAllAttributesProduct);

//*MÉTODOS DE PAGO
router.get('/public-pay-methods', PayMethodController.getPayMethods);
router.get('/pay-methods', authMiddleware, PayMethodController.getPayMethods);
router.post('/pay-methods', authMiddleware, upload.single('image'), PayMethodController.createPayMethod);
router.put('/pay-methods', authMiddleware, upload.single('image'), PayMethodController.updatePayMethod);
router.delete('/pay-methods', authMiddleware, PayMethodController.deletePayMethod);

//*Reportes de usuarios
router.get('/users-report', ReportController.userReport);
router.get('/charge-report', authMiddleware, ReportController.ChargeReport);
router.get('/groups-report', authMiddleware, ReportController.groupsReport);

export default router;
