import { FastifyInstance } from "fastify";
import { requestAppointment } from "./request-appointment";


export async function appointmentsRoutes(app: FastifyInstance) {
    app.post('/appointments', requestAppointment)
}