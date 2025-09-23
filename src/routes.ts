// src/routes/user.routes.ts
import { Router } from 'express';
import { UserController } from './app/controllers/user.controller';

const router = Router();

router.get('/usuario/listar', UserController.getAll);
router.get('/usuario/listar/query', UserController.listarQuery);


export default router;