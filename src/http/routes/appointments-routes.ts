import { FastifyInstance } from "fastify";
import { AppointmentsController } from "../controllers/appointments-controller";
import { verifyJWT } from "../hooks/verify-jwt";
import { verifyUserRole } from "../hooks/verify-user-role";


export async function appointmentsRoutes(app: FastifyInstance) {
    const appointmentsController = new AppointmentsController()
    
    app.post('/appointments', appointmentsController.requestAppointment)
    app.get('/appointments/requested', { onRequest: verifyJWT }, appointmentsController.fetchRequestedAppointments)
    app.patch('/appointments/:id/accept', { onRequest: [verifyJWT, verifyUserRole("VETERINARIAN")]}, appointmentsController.acceptAppointment)
    app.patch('/appointments/:id/deny', { onRequest: [verifyJWT, verifyUserRole("VETERINARIAN")]}, appointmentsController.denyAppointment)
    app.patch('/appointments/:id/finish', { onRequest: [verifyJWT, verifyUserRole("VETERINARIAN")]}, appointmentsController.finishAppointment)
    app.patch('/appointments/:id/update', { onRequest: [verifyJWT, verifyUserRole("VETERINARIAN")]}, appointmentsController.updateAppointment)
}