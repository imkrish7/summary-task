import type { Request, Response } from "express";
import { prisma } from "../core/prismaClient.ts";


export const commentsController = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        const taskId = req.params.taskId;


        const getUser = await prisma.user.findUnique({
            where: {
                email: user?.email!
            }
        })

        if (!getUser) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const isTaskExist = await prisma.task.findFirst({
            where: {
                id: taskId!
            }
        });

        if (!isTaskExist) {
            return res.status(404).json({message: "Task does not exist"})
        }

        let comments: { id: string; content: string; createdAt: Date; updatedAt: Date; taskId: string; userId: string; }[] = []
        if (user?.role === "MEMBER") {
            comments = await prisma.taskComment.findMany({
                where: {
                    userId: getUser?.id,
                    taskId: taskId!
                }
            })
        } else if (user?.role === "MANAGER") {
            comments = await prisma.taskComment.findMany({
                where: {
                    taskId: taskId!
                }
            })
        } else {
            return res.status(403).json({message: "Permission denied!"})
        }
        
        return res.status(200).json({ summary: comments });
        
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
}