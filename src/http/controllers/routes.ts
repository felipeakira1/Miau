import { FastifyInstance } from "fastify";
import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { verifyJWT } from "../hooks/verify-jwt";


export async function routes(app : FastifyInstance) {
    app.post('/authenticate', authenticate)
    app.get('/profile', { onRequest: [verifyJWT] }, profile)
}