import { FastifyInstance } from "fastify";
import { AppointmentsController } from "./appointments-controller";
import { verifyJWT } from "../hooks/verify-jwt";


export async function appointmentsRoutes(app: FastifyInstance) {
    const appointmentsController = new AppointmentsController()
    
    app.post('/appointments', appointmentsController.requestAppointment)
    app.get('/appointments/requested', { onRequest: verifyJWT }, appointmentsController.fetchRequestedAppointments)
}