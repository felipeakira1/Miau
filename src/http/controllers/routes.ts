import { FastifyInstance } from "fastify";
import { authenticate } from "./authenticate";
import { profile } from "./profile";


export async function routes(app : FastifyInstance) {
    app.post('/authenticate', authenticate)
    app.get('/profile', profile)
}