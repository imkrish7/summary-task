import "dotenv/config"
import express from "express"

async function main() {
    try {
        const PORT = 4000;
        const app = express();
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