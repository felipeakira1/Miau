import { FastifyInstance } from "fastify";
import { AnimalController } from "./animal-controller";

export async function animalRoutes(app : FastifyInstance) {
    const animalController = new AnimalController()
    
    app.post('/animals', animalController.createAnimal)
}