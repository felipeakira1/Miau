import { FastifyInstance } from "fastify";
import { OwnerController } from "../controllers/owner-controller";


export async function ownerRoutes(app : FastifyInstance) {
    const ownerController = new OwnerController()
    app.post('/owners', ownerController.register)
    app.get('/owners', ownerController.fetchAllOwners)
    app.get('/owners/:id/animals', ownerController.fetchAnimalsByOwnerId )
    app.get('/owners/:id/appointments', ownerController.fetchAppointmentsByOwnerId)
    app.post('/owners/:id/upload', ownerController.updateOwnerImageUrl)
}