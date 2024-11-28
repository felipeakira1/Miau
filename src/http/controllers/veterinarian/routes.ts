import { FastifyInstance } from "fastify";
import { createVeterinarian } from "./create";
import { fetchAllVeterinarians } from "./fetch-all";


export async function veterinarianRoutes(app : FastifyInstance) {
    app.post('/veterinarians', createVeterinarian)
    app.get('/veterinarians', fetchAllVeterinarians)
}