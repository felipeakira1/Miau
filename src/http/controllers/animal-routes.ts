import { FastifyInstance } from "fastify";
import { AnimalController } from "./animal-controller";
import { FetchAppointmentsByAnimal } from "../../use-cases/fetch-appointments-by-animal";

export async function animalRoutes(app : FastifyInstance) {
    const animalController = new AnimalController()
    
    app.post('/animals', animalController.createAnimal)
    app.get('/animals', animalController.fetchAllAnimals)
    app.get('/animals/:id/appointments', animalController.fetchAppointmentsByAnimalId)
    app.post('/animals/:id/upload', animalController.updateAnimalImageUrl)
}