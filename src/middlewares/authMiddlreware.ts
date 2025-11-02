import type { Response, Request, NextFunction } from "express";
import { verify } from "../core/auth.ts";

export function authMiddleware(permissions: string[] = []) {
    
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const headers = req.headers.authorization ?? "";
            if (!headers || headers.length == 0) {
                return res.status(401).json({message: "Unauthorized"})
            }

            const accessToken = headers.split(" ")[1];
            if (!accessToken) {
                return res.status(401).json({message: "Unauthorized"})
            }

            const user = await verify(accessToken);
            console.log(permissions, user);
            if (permissions.indexOf(user.role) < 0) {
                 return res.status(401).json({message: "Permission denied"})
            }

            req.user = user;

            return next()
            
        } catch (error) {
            console.log(error);
            return res.status(401).json({message: "Unauthorized"})
        }
    }
    
}