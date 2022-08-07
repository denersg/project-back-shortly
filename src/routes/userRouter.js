import { Router } from "express";
import { tokenValidator } from "../middlewares/authTokenValidator.js";
import { getUserById, getRanking } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/users/me", tokenValidator, getUserById);
userRouter.get("/ranking", getRanking);

export default userRouter;