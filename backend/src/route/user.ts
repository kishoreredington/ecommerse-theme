import { Router } from "express";
import { signUp, login } from "../controller/userController.js";

export const userRouter = Router();

userRouter.post("/register", signUp);
userRouter.post("/login", login);
