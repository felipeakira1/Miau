import { FastifyInstance } from "fastify";
import { OwnerController } from "../controllers/owner-controller";
import { verifyJWT } from "../hooks/verify-jwt";
import { verifyUserRole } from "../hooks/verify-user-role";


export async function ownerRoutes(app : FastifyInstance) {
    const ownerController = new OwnerController()
    app.post('/owners', ownerController.register)
    app.get('/owners', ownerController.fetchAllOwners)
    app.get('/owners/:id/animals', ownerController.fetchAnimalsByOwnerId )
    app.get('/owners/:id/appointments', ownerController.fetchAppointmentsByOwnerId)
    
    // Atualizar o próprio usuário
    app.put('/owners/me', { onRequest: [verifyJWT]}, ownerController.updateSelf)
    app.patch('/owners/:id/upload', {onRequest: [verifyJWT]}, ownerController.updateOwnerImageUrl)

    // Atualizar qualquer usuário (admin)
    app.put('/owners/:id', { onRequest: [verifyJWT, verifyUserRole('ADMIN')]}, ownerController.updateByAdmin)
}