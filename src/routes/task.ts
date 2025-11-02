import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddlreware.ts";
import { commentsController } from "../controllers/summary.ts";

const routes = Router();

routes.get("/task/{:taskId}/comments", authMiddleware(["member", "manager"]), commentsController);


export {
    routes as taskRoutes
}