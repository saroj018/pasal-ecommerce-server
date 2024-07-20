import { Router } from "express";
import { loginUser, signUpUser } from "../controller/customer-controller.js";
export const userRouter = Router();
userRouter.route('/signup').post(signUpUser);
userRouter.route('/login').post(loginUser);
