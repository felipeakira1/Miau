import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "../user/authenticate";
import { fetchAnimalsByOwnerId } from "./fetch-animals-by-owner";
import { fetchAppointmentsByOwnerId } from "./fetch-appointments-by-owner";


export async function ownerRoutes(app : FastifyInstance) {
    app.post('/owners', register)
    app.get('/owners/animals/:id', fetchAnimalsByOwnerId )
    app.get('/owners/appointments/:id', fetchAppointmentsByOwnerId)
}