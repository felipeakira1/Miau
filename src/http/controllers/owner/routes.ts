import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "../authenticate";


export async function ownerRoutes(app : FastifyInstance) {
    app.post('/owners', register)
}