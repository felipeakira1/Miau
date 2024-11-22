import { FastifyInstance } from "fastify";
import { authenticate } from "./user/authenticate";
import { profile } from "./user/profile";
import { verifyJWT } from "../hooks/verify-jwt";
import { refresh } from "./user/refresh";


export async function routes(app : FastifyInstance) {
    app.post('/authenticate', authenticate)
    app.get('/profile', { onRequest: [verifyJWT] }, profile)
    app.patch('/token/refresh', refresh)
}