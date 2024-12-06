import { FastifyInstance } from "fastify";
import { AppointmentsController } from "./appointments-controller";
import { verifyJWT } from "../hooks/verify-jwt";
import { verifyUserRole } from "../hooks/verify-user-role";


export async function appointmentsRoutes(app: FastifyInstance) {
    const appointmentsController = new AppointmentsController()
    
    app.post('/appointments', appointmentsController.requestAppointment)
    app.get('/appointments/requested', { onRequest: verifyJWT }, appointmentsController.fetchRequestedAppointments)
    app.patch('/appointments/:id/accept', { onRequest: [verifyJWT, verifyUserRole("VETERINARIAN")]}, appointmentsController.acceptAppointment)
    app.patch('/appointments/:id/deny', { onRequest: [verifyJWT, verifyUserRole("VETERINARIAN")]}, appointmentsController.denyAppointment)

}