import { Router } from "express";
import { signUp } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/signup", signUp);
authRouter.post("/", );

export default authRouter;