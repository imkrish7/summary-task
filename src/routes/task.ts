import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddlreware.ts";
import { commentsController } from "../controllers/summary.ts";

const routes = Router();

routes.get("/task/{:taskId}/comments", authMiddleware, commentsController);


export {
    routes as taskRoutes
}