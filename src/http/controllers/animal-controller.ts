import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { MakeCreateAnimalUseCase } from "../../use-cases/factories/make-create-animal-use-case";

export class AnimalController {
    async createAnimal(request: FastifyRequest, reply: FastifyReply) {
        const createAnimalBodySchema = z.object({
            name: z.string(),
            species: z.string(),
            breed: z.string(),
            birthDate: z.string(),
            weight: z.number(),
            ownerId: z.number(),
        })

        try {
            const { name, species, breed, birthDate, weight, ownerId } = createAnimalBodySchema.parse(request.body)
            const parsedBirthDate = new Date(birthDate)
            const createAnimalUseCase = MakeCreateAnimalUseCase()
            const { animal } = await createAnimalUseCase.execute({
                name,
                species,
                breed,
                birthDate: parsedBirthDate,
                weight,
                ownerId,
            })
            return reply.status(201).send({animal})
        } catch(err) {
            console.error(err)
            return reply.status(500).send({message: 'Internal Error'})
        }
    }

    async fetchAnimalsByOwnerId(request : FastifyRequest, reply: FastifyReply) {
        
    }
}