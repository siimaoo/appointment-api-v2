import { Router } from "express";
import ShowUserController from "./useCases/ShowUser/ShowUserController";
import DeleteUserController from './useCases/DeleteUser/DeleteUserController';
import UpdateUserController from "./useCases/UpdateUser/UpdateUserController";
import CreateUserController from "./useCases/CreateUser/CreateUserController";
import AuthController from "./useCases/Auth/AuthController";
import AuthMiddlewareController from "./middleware/AuthMiddlewareController";
import MakeAppointmentController from "./useCases/MakeAppointment/MakeAppointmentController";

const router = Router();

router.post("/user/:id/make-appointment", AuthMiddlewareController.handle, MakeAppointmentController.handle);
router.post("/signup", CreateUserController.handle);
router.post("/signin", AuthController.handle);
router.get("/user/:id", AuthMiddlewareController.handle, ShowUserController.handle);
router.put("/user/:id", AuthMiddlewareController.handle, UpdateUserController.handle);
router.delete("/user/:id", AuthMiddlewareController.handle, DeleteUserController.handle);

export { router };
