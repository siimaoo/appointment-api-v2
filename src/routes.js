import { Router } from "express";
import ShowUserController from "./useCases/ShowUser/ShowUserController";
import DeleteUserController from './useCases/DeleteUser/DeleteUserController';
import UpdateUserController from "./useCases/UpdateUser/UpdateUserController";
import CreateUserController from "./useCases/CreateUser/CreateUserController";
import AuthController from "./useCases/Auth/AuthController";
import AuthMiddlewareController from "./middleware/AuthMiddlewareController";

const router = Router();

router.post("/signup", CreateUserController.handle);
router.post("/signin", AuthController.handle);
router.get("/user/:id", AuthMiddlewareController.handle, ShowUserController.handle);
router.put("/user/:id", UpdateUserController.handle);
router.delete("/user/:id", DeleteUserController.handle);

export { router };
