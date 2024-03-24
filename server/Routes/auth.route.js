import express from "express";
import { register,login, logout } from "../Controllers/auth.controller.js";
import { asyncCatch } from "../Utils/trycatch.js";
import { validateRegister,validateLogin } from "../Validation/auth.validation.js";

const authRouter = express.Router();

authRouter.post('/register',asyncCatch(validateRegister),asyncCatch(register));
authRouter.post('/login',asyncCatch(validateLogin),asyncCatch(login));
authRouter.post('/logout',asyncCatch(logout));
export default authRouter;