// src/routes/user.routes.ts
import { Router } from "express";
import { authMiddleware } from "./middlewares/authMiddleware";
import { UserController } from "./app/controllers/user.controller";
import { RoleController } from "./app/controllers/role.controller";

const router = Router();

router.post("/users/create", UserController.createUser);
router.post("/users/authenticate", UserController.authenticateUser);

//ROLES Y CARGOS
router.get("/roles", authMiddleware, RoleController.getRoles);

export default router;
