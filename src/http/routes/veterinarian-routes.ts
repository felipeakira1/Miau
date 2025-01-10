import { FastifyInstance } from "fastify";
import { VeterinarianController } from "../controllers/veterinarian-controller";
import { verifyJWT } from "../hooks/verify-jwt";
import { verifyUserRole } from "../hooks/verify-user-role";


export async function veterinarianRoutes(app : FastifyInstance) {
    const veterinarianController = new VeterinarianController()
    app.post('/veterinarians', veterinarianController.createVeterinarian)
    app.get('/veterinarians', veterinarianController.fetchAllVeterinarians)
    app.put('/veterinarians/me', { onRequest: [verifyJWT]}, veterinarianController.updateSelf)
    app.put('/veterinarians/:id', {onRequest: [verifyJWT, verifyUserRole('ADMIN')]}, veterinarianController.updateByAdmin)
    app.patch('/veterinarians/:id/upload', veterinarianController.updateVeterinarianImageUrl)
}