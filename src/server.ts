import "dotenv/config"
import express from "express"
import { authRoutes } from "./routes/auth.ts";
import { taskRoutes } from "./routes/task.ts";

async function main() {
    try {
        const PORT = 4000;
        const app = express();
        app.use(express.json());

        app.use("/v1", authRoutes);
        app.use("/v1", taskRoutes);
        await app.listen(PORT)
    } catch (error) {
        throw error;
    }
}

main().then(() => {
    console.log("Server startd")
}).catch((error)=>{
    console.log("An error occured server shutdown", error)
})