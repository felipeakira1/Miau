import { FastifyInstance } from "fastify";
import { authenticate } from "../user/authenticate";
import { createVeterinarian } from "./create";


export async function veterinarianRoutes(app : FastifyInstance) {
    app.post('/veterinarians/create', createVeterinarian)
}