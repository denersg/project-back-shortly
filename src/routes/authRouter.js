import { Router } from "express";
import { signUp, signIn } from "../controllers/authController.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import userSchema from "../schemas/userSchema.js";
import signInSchema from "../schemas/signInSchema.js";

const authRouter = Router();

authRouter.post("/signup", schemaValidator(userSchema), signUp);
authRouter.post("/signin", schemaValidator(signInSchema), signIn);

export default authRouter;