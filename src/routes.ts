// src/routes/user.routes.ts
import { Router } from 'express';
import { UserController } from './app/controllers/user.controller';

const router = Router();

router.post('/users/create', UserController.createUser);
router.post('/users/authenticate', UserController.authenticateUser);

router.get('/usuario/listar', UserController.getAll);
router.get('/usuario/listar/query', UserController.listarQuery);


export default router;