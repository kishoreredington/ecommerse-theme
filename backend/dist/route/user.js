import { Router } from "express";
import { signUp, login, refreshToken } from "../controller/userController.js";
export const userRouter = Router();
userRouter.post("/register", signUp);
userRouter.post("/login", login);
userRouter.post("/refresh", refreshToken);
//# sourceMappingURL=user.js.map