import { FastifyInstance } from "fastify";
import { createVeterinarian } from "./create";
import { fetchAllVeterinarians } from "./fetch-all";
import { updateVeterinarianImageUrl } from "./update-veterinarian-imageurl";


export async function veterinarianRoutes(app : FastifyInstance) {
    app.post('/veterinarians', createVeterinarian)
    app.get('/veterinarians', fetchAllVeterinarians)
    app.patch('/veterinarians/:id/upload', updateVeterinarianImageUrl)
}