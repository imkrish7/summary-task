import { Router } from "express";
import { loginController } from "../controllers/auth.ts";

const routes = Router();


routes.post("/login", loginController);

export {
    routes as authRoutes
}