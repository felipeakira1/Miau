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
            imageUrl: z.string().optional(),
        })

        try {
            const { name, species, breed, birthDate, weight, ownerId, imageUrl } = createAnimalBodySchema.parse(request.body)
            const parsedBirthDate = new Date(birthDate)
            const createAnimalUseCase = MakeCreateAnimalUseCase()
            const { animal } = await createAnimalUseCase.execute({
                name,
                species,
                breed,
                birthDate: parsedBirthDate,
                weight,
                ownerId,
                imageUrl
            })
            return reply.status(201).send({animal})
        } catch(err) {
            return reply.status(500).send({message: 'Internal Error'})
        }
    }
}