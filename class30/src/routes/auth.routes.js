import { registerUser } from "../controllers/auth.controller.js";
import { Router } from "express";

const authRouter = Router();
 

authRouter.post('/register', registerUser);
export default authRouter;