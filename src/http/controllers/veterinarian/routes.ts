import { FastifyInstance } from "fastify";
import { createVeterinarian } from "./create";


export async function veterinarianRoutes(app : FastifyInstance) {
    app.post('/veterinarians', createVeterinarian)
}