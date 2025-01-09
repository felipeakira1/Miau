import { FastifyInstance } from "fastify";
import { VeterinarianController } from "../controllers/veterinarian-controller";


export async function veterinarianRoutes(app : FastifyInstance) {
    const veterinarianController = new VeterinarianController()
    app.post('/veterinarians', veterinarianController.createVeterinarian)
    app.get('/veterinarians', veterinarianController.fetchAllVeterinarians)
    app.patch('/veterinarians/:id/upload', veterinarianController.updateVeterinarianImageUrl)
}