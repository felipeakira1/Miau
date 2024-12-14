import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "../user/authenticate";
import { fetchAnimalsByOwnerId } from "./fetch-animals-by-owner";
import { fetchAppointmentsByOwnerId } from "./fetch-appointments-by-owner";
import { fetchAllOwners } from "./fetch-all-owners";
import { updateOwnerImageUrl } from "./update-owner-imageurl";


export async function ownerRoutes(app : FastifyInstance) {
    app.post('/owners', register)
    app.get('/owners', fetchAllOwners)
    app.get('/owners/animals/:id', fetchAnimalsByOwnerId )
    app.get('/owners/appointments/:id', fetchAppointmentsByOwnerId)
    app.post('/owners/:id/upload', updateOwnerImageUrl)
}