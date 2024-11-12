import { FastifyInstance } from "fastify";
import { register } from "./register";


export async function ownerRoutes(app : FastifyInstance) {
    app.post('/owners', register)
}