import { Router } from "express";
import ShowUserController from "./useCases/ShowUser/ShowUserController";
import DeleteUserController from './useCases/DeleteUser/DeleteUserController';
import UpdateUserController from "./useCases/UpdateUser/UpdateUserController";
import CreateUserController from "./useCases/CreateUser/CreateUserController";
import AuthController from "./useCases/Auth/AuthController";
import AuthMiddlewareController from "./middleware/AuthMiddlewareController";
import MakeAppointmentController from "./useCases/MakeAppointment/MakeAppointmentController";
import ShowUserAppointmentsController from "./useCases/ShowUserAppointments/ShowUserAppointmentsController";
import IndexUsersController from "./useCases/IndexUsers/IndexUsersController";
import IndexAppointmentController from "./useCases/IndexAppointment/IndexAppointmentController";
import IndexUnavailableDaysController from "./useCases/IndexUnavailableDays/IndexUnavailableDaysController";

const router = Router();

router.get("/appointments/unavailable-days", IndexUnavailableDaysController.handle);
router.get("/appointments", AuthMiddlewareController.onlyAdmin, IndexAppointmentController.handle);
router.get("/users", AuthMiddlewareController.onlyAdmin, IndexUsersController.handle);
router.get("/user/:id/appointments", AuthMiddlewareController.handle, ShowUserAppointmentsController.handle);
router.post("/user/:id/make-appointment", AuthMiddlewareController.handle, MakeAppointmentController.handle);
router.post("/signup", CreateUserController.handle);
router.post("/signin", AuthController.handle);
router.get("/user/:id", AuthMiddlewareController.handle, ShowUserController.handle);
router.put("/user/:id", AuthMiddlewareController.handle, UpdateUserController.handle);
router.delete("/user/:id", AuthMiddlewareController.handle, DeleteUserController.handle);

export { router };
