import { Router } from "express";
import { signUp, login } from "../controller/userController.js";

export const userRouter = Router();

userRouter.post("/sign-up", signUp);
userRouter.post("/login", login);
