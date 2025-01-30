import { FastifyInstance } from "fastify";
import { VeterinarianController } from "../controllers/veterinarian-controller";
import { verifyJWT } from "../hooks/verify-jwt";
import { verifyUserRole } from "../hooks/verify-user-role";
import { createVeterinarianSchema, fetchAllVeterinariansSchema, updateByAdminSchema, updateSelfSchema, updateVeterinarianImageUrlSchema } from "../../schemas/veterinarian.schema";


export async function veterinarianRoutes(app : FastifyInstance) {
    const veterinarianController = new VeterinarianController()
    app.post('/veterinarians', { schema: createVeterinarianSchema }, veterinarianController.createVeterinarian);
    app.get('/veterinarians', { schema: fetchAllVeterinariansSchema }, veterinarianController.fetchAllVeterinarians);
    app.put('/veterinarians/me', { onRequest: [verifyJWT] }, veterinarianController.updateSelf);
    app.patch('/veterinarians/me/upload',  { onRequest: [verifyJWT] }, veterinarianController.updateSelfImage)
    app.put('/veterinarians/:id', { onRequest: [verifyJWT, verifyUserRole('ADMIN')], schema: updateByAdminSchema }, veterinarianController.updateByAdmin);
    app.patch('/veterinarians/:id/upload', veterinarianController.updateVeterinarianImageUrl);
}