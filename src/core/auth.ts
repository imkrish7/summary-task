import jwt from "jsonwebtoken"

interface Payload {
    email: string,
    role: string
}

const JWT_SECRET = "sec63"


export async function issueJWT(params: Payload) {
    try {
        console.log(params);
        const accessToken = await jwt.sign(params, JWT_SECRET, { algorithm: "HS256", expiresIn: 60*60 })
        return accessToken
    } catch (error) {
        throw error;
    }
}

export async function verify(accessToken: string): Promise<Payload> {
    try {
        const params = await jwt.verify(accessToken, JWT_SECRET)
        console.log(params);
        return params as Payload
    } catch (error) {
        throw error;
    }
}