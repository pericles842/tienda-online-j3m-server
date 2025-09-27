// src/routes/user.routes.ts
import { Router } from "express";
import { authMiddleware } from "./middlewares/authMiddleware";
import { UserController } from "./app/controllers/user.controller";
import { RoleController } from "./app/controllers/role.controller";
import { StatesController } from "./app/controllers/state.controller";
import { PublicGroupsController } from "./app/controllers/public_groups.controller";

const router = Router();

router.post("/users/create", UserController.createUser);
router.post("/users/authenticate", UserController.authenticateUser);
router.post("/users/refreshToken", UserController.refreshToken);

//MUNICIPIOS Y CIUDADES
router.get("/states", StatesController.getStates);
router.get("/cities/:id_state", StatesController.getMunicipalities);
router.get("/parishes/:id_city", StatesController.getParishes);

//Cajas de ahorro
router.get("/public_groups", PublicGroupsController.getPublicGroups);

//ROLES Y CARGOS
router.get("/roles", authMiddleware, RoleController.getRoles);

export default router;
