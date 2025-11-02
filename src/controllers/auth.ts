import type { Response, Request } from "express";
import { prisma } from "../core/prismaClient.ts";
import { issueJWT } from "../core/auth.ts";

export const loginController = async (request: Request, response: Response) => {
    try {
        
        const { email } = request.body;

        if (!email) {
            return response.status(401).json({message: "Invalid request!"})
        }

        const isUserExist = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if (!isUserExist) {
            return response.status(401).json({message: "Invalid request!"})
        }

        const accessToken = await issueJWT({ email: email, role: isUserExist.role });
        return response.status(200).json({accessToken: accessToken})

    } catch (error) {
        return response.status(500).json({message: "Internal server error"})
    }
}