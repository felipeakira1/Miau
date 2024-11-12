import { FastifyInstance } from "fastify";
import { authenticate } from "./authenticate";


export async function routes(app : FastifyInstance) {
    app.post('/authenticate', authenticate)
}