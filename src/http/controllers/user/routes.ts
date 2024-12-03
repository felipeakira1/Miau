import { FastifyInstance } from "fastify";
import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { verifyJWT } from "../../hooks/verify-jwt";
import { refresh } from "./refresh";
import { fetchAllUsers } from "./fetch-all-users";


export async function userRoutes(app : FastifyInstance) {
    app.post('/authenticate', authenticate)
    app.get('/profile', { onRequest: [verifyJWT] }, profile)
    app.patch('/token/refresh', refresh)
    app.get('/users', fetchAllUsers)
}